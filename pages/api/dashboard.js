import { getConnection } from '@/lib/solana';
import { fetchLaunchpadSummary, fetchTrendingTokens, fetchWalletLeaders } from '@/lib/solscan';

const fallbackHistory = Array.from({ length: 12 }).map((_, index) => ({
  time: `${index + 1}:00`,
  volume: Math.round(200 + Math.random() * 120)
}));

const buildWhaleMoves = (wallets) =>
  wallets.slice(0, 5).map((wallet, index) => ({
    id: `${wallet.address}-${index}`,
    wallet: wallet.address,
    amount: (wallet.value / 1000).toFixed(2),
    timeAgo: `${Math.floor(Math.random() * 45) + 5}m ago`,
    description: `Moved ${wallet.symbol ?? 'SOL'} via Telemetry Terminal`
  }));

export default async function handler(req, res) {
  try {
    const connection = getConnection();
    const [trending, launches, wallets] = await Promise.all([
      fetchTrendingTokens(),
      fetchLaunchpadSummary(),
      fetchWalletLeaders()
    ]);

    let slot = 0;
    try {
      slot = await connection.getSlot('confirmed');
    } catch (slotError) {
      console.warn('Unable to fetch latest slot from RPC', slotError);
    }

    const response = {
      aggregates: {
        volume24h: trending.reduce((total, token) => total + token.volume24h, 0),
        launches24h: launches.length,
        constructions: launches.filter((launch) => launch.status === 'active').length,
        averageRaise: Math.round(
          launches.reduce((acc, launch) => acc + launch.raised, 0) / Math.max(launches.length, 1)
        ),
        medianRaise: launches[Math.floor(launches.length / 2)]?.raised ?? 0,
        whaleMoves: buildWhaleMoves(wallets)
      },
      launchHistory: fallbackHistory,
      launchpadSummary: launches,
      trending,
      categories: ['All', 'Meme', 'DeFi', 'Gaming'],
      walletTracker: wallets,
      slot
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
