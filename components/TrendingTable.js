import styles from '@/styles/Home.module.css';

export default function TrendingTable({ trending, categories, isLoading, onRowAction }) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelTitle}>Trending</p>
          <p className={styles.panelSubtitle}>Top Solana movers (24h)</p>
        </div>
        <div className={styles.panelFilters}>
          {categories?.map((category) => (
            <span key={category} className={styles.filterTag}>
              {category}
            </span>
          ))}
        </div>
      </header>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Change</th>
              <th>MC</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className={styles.placeholderRow} colSpan={6}>
                  Loading markets…
                </td>
              </tr>
            )}
            {!isLoading && trending?.length === 0 && (
              <tr>
                <td className={styles.placeholderRow} colSpan={6}>
                  No trending tokens.
                </td>
              </tr>
            )}
            {!isLoading &&
              trending?.map((token) => (
                <tr key={token.address}>
                  <td>
                    <div className={styles.assetCell}>
                      <img src={token.logo} alt={token.symbol} />
                      <div>
                        <p className={styles.assetName}>{token.name}</p>
                        <p className={styles.assetSymbol}>{token.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td>${token.price.toFixed(4)}</td>
                  <td>${token.volume24h.toLocaleString()}</td>
                  <td className={token.change24h >= 0 ? styles.positive : styles.negative}>
                    {token.change24h.toFixed(2)}%
                  </td>
                  <td>${token.marketCap.toLocaleString()}</td>
                  <td>
                    <button type="button" className={styles.smallButton} onClick={onRowAction}>
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
