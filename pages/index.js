import { useCallback, useMemo, useState } from 'react';
import useDashboardData from '@/lib/useDashboardData';
import Layout from '@/components/Layout';
import WalletTracker from '@/components/WalletTracker';
import OverviewCharts from '@/components/OverviewCharts';
import LaunchpadSummary from '@/components/LaunchpadSummary';
import TrendingTable from '@/components/TrendingTable';
import RecentWhales from '@/components/RecentWhales';
import WalletConnectModal from '@/components/WalletConnectModal';
import DepositModal from '@/components/DepositModal';
import AirdropModal from '@/components/AirdropModal';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);

  const { data, isLoading, isError, refresh } = useDashboardData();

  const handleActionRequest = useCallback(() => {
    setShowWalletModal(true);
  }, []);

  const handleWalletConnected = useCallback((pubkey) => {
    setWallet(pubkey);
    setShowWalletModal(false);
    setShowDepositModal(true);
  }, []);

  const handleDepositComplete = useCallback((signature) => {
    setLastTransaction(signature);
    setShowDepositModal(false);
    setShowAirdropModal(true);
  }, []);

  const closeAirdropModal = useCallback(() => {
    setShowAirdropModal(false);
  }, []);

  const tiles = useMemo(() => ({
    volume: data?.aggregates?.volume24h ?? 0,
    launches: data?.aggregates?.launches24h ?? 0,
    constructions: data?.aggregates?.constructions ?? 0,
    whaleMoves: data?.aggregates?.whaleMoves ?? []
  }), [data]);

  return (
    <Layout onActionRequested={handleActionRequest} stats={tiles} isLoading={isLoading}>
      <div className={styles.dashboardGrid}>
        <div className={styles.sidebar}>
          <WalletTracker
            wallets={data?.walletTracker ?? []}
            onImportClick={handleActionRequest}
            isLoading={isLoading}
            onRefresh={refresh}
          />
        </div>
        <div className={styles.mainColumn}>
          <OverviewCharts
            history={data?.launchHistory ?? []}
            aggregations={data?.aggregates}
            isLoading={isLoading}
          />
          <LaunchpadSummary
            summary={data?.launchpadSummary ?? []}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.secondaryColumn}>
          <RecentWhales
            moves={data?.aggregates?.whaleMoves ?? []}
            isLoading={isLoading}
          />
          <TrendingTable
            trending={data?.trending ?? []}
            categories={data?.categories ?? []}
            isLoading={isLoading}
            onRowAction={handleActionRequest}
          />
        </div>
      </div>

      <WalletConnectModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnected={handleWalletConnected}
      />
      <DepositModal
        open={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        wallet={wallet}
        rpcEndpoint={process.env.NEXT_PUBLIC_SOLANA_RPC_URL}
        onDepositComplete={handleDepositComplete}
      />
      <AirdropModal
        open={showAirdropModal}
        onClose={closeAirdropModal}
        signature={lastTransaction}
        wallet={wallet}
      />
    </Layout>
  );
}
