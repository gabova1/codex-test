import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import { fetchPotentialAirdrops } from '@/lib/solscan';

export default function AirdropModal({ open, onClose, signature, wallet }) {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !wallet) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const result = await fetchPotentialAirdrops(wallet);
        if (!ignore) {
          setAirdrops(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [open, wallet]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Check Airdrop Eligibility</h2>
        <p className={styles.modalDescription}>
          Your deposit was confirmed ({signature?.slice?.(0, 8)}…). Explore potential airdrops linked to your
          wallet below.
        </p>
        {loading && <p className={styles.placeholder}>Scanning Solscan…</p>}
        {!loading && airdrops.length === 0 && <p className={styles.placeholder}>No airdrops detected yet.</p>}
        {!loading && airdrops.length > 0 && (
          <ul className={styles.airdropList}>
            {airdrops.map((airdrop) => (
              <li key={airdrop.id}>
                <p className={styles.assetName}>{airdrop.name}</p>
                <p className={styles.assetSymbol}>{airdrop.description}</p>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.modalActions}>
          <button type="button" className={styles.primaryButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
