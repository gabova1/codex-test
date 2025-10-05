const SOLSCAN_ENDPOINT = 'https://pro-api.solscan.io';

const getApiKey = () => process.env.SOLSCAN_API_KEY || process.env.NEXT_PUBLIC_SOLSCAN_API_KEY;

const request = async (path, searchParams = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Missing Solscan API key');
  }

  const url = new URL(path, SOLSCAN_ENDPOINT);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      accept: 'application/json',
      token: apiKey
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Solscan API error (${response.status}): ${message}`);
  }

  return response.json();
};

export const fetchTrendingTokens = async () => {
  try {
    const data = await request('/v2/market/trending', { limit: 10, sort_by: 'volume24h' });
    return data?.data?.map((item) => ({
      id: item.token_address,
      address: item.token_address,
      name: item.token_name,
      symbol: item.token_symbol,
      price: item.price,
      change24h: item.price_change_percent,
      volume24h: item.volume_24h,
      marketCap: item.market_cap,
      logo: item.token_icon
    })) ?? [];
  } catch (error) {
    console.error(error);
    return [
      {
        id: 'default-sol',
        address: 'So11111111111111111111111111111111111111112',
        name: 'Wrapped SOL',
        symbol: 'SOL',
        price: 152.34,
        change24h: 3.45,
        volume24h: 12872345,
        marketCap: 6758345234,
        logo: 'https://cryptologos.cc/logos/solana-sol-logo.png'
      },
      {
        id: 'default-bonk',
        address: 'Bonk111111111111111111111111111111111111111',
        name: 'Bonk',
        symbol: 'BONK',
        price: 0.000026,
        change24h: -4.72,
        volume24h: 27834123,
        marketCap: 129348234,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23095.png'
      },
      {
        id: 'default-samoyed',
        address: 'Samoyed11111111111111111111111111111111111',
        name: 'Samoyedcoin',
        symbol: 'SAMO',
        price: 0.0192,
        change24h: 12.45,
        volume24h: 9823456,
        marketCap: 72938456,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9821.png'
      },
      {
        id: 'default-ray',
        address: 'Raydium11111111111111111111111111111111111',
        name: 'Raydium',
        symbol: 'RAY',
        price: 1.23,
        change24h: -1.87,
        volume24h: 4382341,
        marketCap: 182334567,
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png'
      }
    ];
  }
};

export const fetchLaunchpadSummary = async () => {
  try {
    const data = await request('/v2/launchpad/projects', { limit: 6 });
    return data?.data?.map((project) => ({
      id: project.project_id,
      name: project.project_name,
      symbol: project.token_symbol,
      raised: project.total_raise_usd,
      holders: project.holders,
      fdv: project.fdv,
      status: project.status,
      logo: project.logo
    })) ?? [];
  } catch (error) {
    console.error(error);
    return [
      {
        id: 'default-1',
        name: 'SUTTI',
        symbol: 'SUTTI',
        raised: 2450000,
        holders: 1823,
        fdv: 45000000,
        status: 'active',
        logo: 'https://dummyimage.com/64x64/33ffce/020617&text=S'
      },
      {
        id: 'default-2',
        name: 'SMAV',
        symbol: 'SMAV',
        raised: 1250000,
        holders: 945,
        fdv: 28000000,
        status: 'completed',
        logo: 'https://dummyimage.com/64x64/0ea5e9/020617&text=M'
      }
    ];
  }
};

export const fetchWalletLeaders = async () => {
  try {
    const data = await request('/v2/portfolio/top', { limit: 5 });
    return data?.data?.map((wallet) => ({
      address: wallet.address,
      name: wallet.nickname || wallet.address.slice(0, 6),
      value: wallet.total_value_usd,
      pnl: wallet.pnl_24h_percent,
      avatarUrl: wallet.avatar || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + wallet.address
    })) ?? [];
  } catch (error) {
    console.error(error);
    return [
      {
        address: '7c7yTeL3M3trYwALLeT1',
        name: 'SUTTI (OG)',
        value: 982345.12,
        pnl: 12.35,
        symbol: 'SOL',
        avatarUrl: 'https://dummyimage.com/64x64/7c3aed/ffffff&text=SU'
      },
      {
        address: '4d3fTelemetryTerm1nal',
        name: 'SMAV',
        value: 564231.44,
        pnl: -2.41,
        symbol: 'SOL',
        avatarUrl: 'https://dummyimage.com/64x64/6366f1/ffffff&text=SM'
      },
      {
        address: '3TelemetryXRayWallet1111111111111111111111',
        name: 'STRIKAR',
        value: 342198.11,
        pnl: 6.75,
        symbol: 'SOL',
        avatarUrl: 'https://dummyimage.com/64x64/22d3ee/020617&text=ST'
      },
      {
        address: '9TelemetrySkyport111111111111111111111111',
        name: 'SKYPORT',
        value: 278421.67,
        pnl: 18.21,
        symbol: 'SOL',
        avatarUrl: 'https://dummyimage.com/64x64/0ea5e9/020617&text=SK'
      },
      {
        address: '5TelemetryQuantra111111111111111111111111',
        name: 'QUANTRIX',
        value: 189422.05,
        pnl: -1.92,
        symbol: 'SOL',
        avatarUrl: 'https://dummyimage.com/64x64/14b8a6/020617&text=QU'
      }
    ];
  }
};

export const fetchPotentialAirdrops = async (address) => {
  try {
    const data = await request('/v2/account/airdrops', { address });
    return data?.data?.map((item) => ({
      id: item.id,
      name: item.project,
      description: `${item.amount} ${item.symbol} pending`
    })) ?? [];
  } catch (error) {
    console.error(error);
    return [
      {
        id: 'default-airdrop',
        name: 'Telemetry Drop',
        description: 'Claim 250 TELE tokens pending review'
      }
    ];
  }
};
