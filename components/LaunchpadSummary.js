import styles from '@/styles/Home.module.css';

export default function LaunchpadSummary({ summary, isLoading }) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelTitle}>Launches &amp; Constructions</p>
          <p className={styles.panelSubtitle}>Filtered from Solscan launchpad</p>
        </div>
      </header>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Raised</th>
              <th>Holders</th>
              <th>FDV</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className={styles.placeholderRow} colSpan={5}>
                  Loading launches…
                </td>
              </tr>
            )}
            {!isLoading && summary?.length === 0 && (
              <tr>
                <td className={styles.placeholderRow} colSpan={5}>
                  No launches available.
                </td>
              </tr>
            )}
            {!isLoading &&
              summary?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.assetCell}>
                      <img src={item.logo} alt={item.name} />
                      <div>
                        <p className={styles.assetName}>{item.name}</p>
                        <p className={styles.assetSymbol}>{item.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td>${item.raised.toLocaleString()}</td>
                  <td>{item.holders.toLocaleString()}</td>
                  <td>${item.fdv.toLocaleString()}</td>
                  <td>
                    <span className={styles.statusBadge}>{item.status}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
