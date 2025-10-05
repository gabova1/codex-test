import styles from '@/styles/Home.module.css';

export default function RecentWhales({ moves, isLoading }) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelTitle}>Whale Moves</p>
          <p className={styles.panelSubtitle}>Large trades in the last 24h</p>
        </div>
      </header>
      <div className={styles.whaleList}>
        {isLoading && <p className={styles.placeholder}>Loading whale activity…</p>}
        {!isLoading && moves?.length === 0 && <p className={styles.placeholder}>No whale moves found.</p>}
        {!isLoading &&
          moves?.map((move) => (
            <article key={move.id} className={styles.whaleItem}>
              <div>
                <p className={styles.whaleAddress}>{move.wallet}</p>
                <p className={styles.whaleDescription}>{move.description}</p>
              </div>
              <div className={styles.whaleMeta}>
                <span className={styles.whaleValue}>{move.amount} SOL</span>
                <span className={styles.whaleTime}>{move.timeAgo}</span>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
