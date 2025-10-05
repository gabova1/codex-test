import { useCallback, useEffect, useState } from 'react';
import { getConnection, solanaPublicKeyFromProvider } from '@/lib/solana';
import styles from '@/styles/Home.module.css';

export default function WalletConnectModal({ open, onClose, onConnected }) {
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!open) {
      setError(null);
      setConnecting(false);
    }
  }, [open]);

  const connectWallet = useCallback(async () => {
    if (!window?.solana) {
      setError('Solana wallet not detected. Install Phantom or Backpack.');
      return;
    }

    try {
      setConnecting(true);
      const response = await window.solana.connect();
      const pubkey = solanaPublicKeyFromProvider(response);
      if (!pubkey) {
        throw new Error('Failed to read public key');
      }
      const connection = getConnection();
      await connection.getBalance(pubkey); // sanity check
      onConnected(pubkey.toBase58());
    } catch (err) {
      setError(err.message ?? 'Unable to connect to wallet');
    } finally {
      setConnecting(false);
    }
  }, [onConnected]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Connect Solana Wallet</h2>
        <p className={styles.modalDescription}>
          Press the button below to connect your Solana wallet. All interactions are routed through your
          QuickNode RPC endpoint for real-time performance.
        </p>
        {error && <p className={styles.modalError}>{error}</p>}
        <div className={styles.modalActions}>
          <button type="button" className={styles.primaryButton} onClick={connectWallet} disabled={connecting}>
            {connecting ? 'Connecting…' : 'Connect Wallet'}
          </button>
          <button type="button" className={styles.smallButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
