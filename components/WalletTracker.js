import styles from '@/styles/Home.module.css';

export default function WalletTracker({ wallets, onImportClick, isLoading, onRefresh }) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelTitle}>Wallet Tracker</p>
          <p className={styles.panelSubtitle}>Live Trades</p>
        </div>
        <div className={styles.panelActions}>
          <button type="button" className={styles.smallButton} onClick={onRefresh}>
            Refresh
          </button>
          <button type="button" className={styles.primaryButton} onClick={onImportClick}>
            + Import 25,217,947 WALLET
          </button>
        </div>
      </header>
      <div className={styles.walletList}>
        {isLoading && <p className={styles.placeholder}>Loading wallets…</p>}
        {!isLoading && wallets?.length === 0 && <p className={styles.placeholder}>No wallets yet.</p>}
        {!isLoading &&
          wallets?.map((wallet) => (
            <article key={wallet.address} className={styles.walletCard}>
              <div className={styles.walletAvatar}>
                <img src={wallet.avatarUrl} alt={wallet.name} />
              </div>
              <div className={styles.walletInfo}>
                <p className={styles.walletName}>{wallet.name}</p>
                <p className={styles.walletAddress}>{wallet.address}</p>
              </div>
              <div className={styles.walletStats}>
                <p className={styles.walletPnl}>{wallet.pnl.toFixed(2)}%</p>
                <p className={styles.walletValue}>${wallet.value.toLocaleString()}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
