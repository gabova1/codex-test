import clsx from 'clsx';
import styles from '@/styles/Home.module.css';

const tabs = ['Discovery', 'X-Ray', 'Portfolio', 'Overwatch'];

export default function TopNav({ onActionRequested, stats, isLoading }) {
  return (
    <header className={styles.topNav}>
      <div className={styles.logoArea}>
        <div className={styles.logoMark}>T</div>
        <div>
          <p className={styles.logoTitle}>TELEMETRY</p>
          <p className={styles.logoSubtitle}>terminal</p>
        </div>
      </div>
      <nav className={styles.navTabs}>
        {tabs.map((tab) => (
          <button key={tab} type="button" className={clsx(styles.navTab, tab === 'Discovery' && styles.navTabActive)}>
            {tab}
          </button>
        ))}
      </nav>
      <div className={styles.metricsRow}>
        <div className={styles.metricTile}>
          <p className={styles.metricLabel}>SOL Launched Volume (24h)</p>
          <p className={styles.metricValue}>{isLoading ? '—' : `${stats?.volume?.toLocaleString?.() ?? '—'} SOL`}</p>
        </div>
        <div className={styles.metricTile}>
          <p className={styles.metricLabel}>Launches &amp; Constructions</p>
          <p className={styles.metricValue}>{isLoading ? '—' : `${stats?.launches ?? 0} / ${stats?.constructions ?? 0}`}</p>
        </div>
        <div className={styles.metricTile}>
          <p className={styles.metricLabel}>Whale Moves</p>
          <p className={styles.metricValue}>{isLoading ? '—' : stats?.whaleMoves?.length ?? 0}</p>
        </div>
      </div>
      <div className={styles.navActions}>
        <button type="button" className={styles.navButton} onClick={onActionRequested}>
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
