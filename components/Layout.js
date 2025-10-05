import TopNav from '@/components/TopNav';
import styles from '@/styles/Home.module.css';

export default function Layout({ children, onActionRequested, stats, isLoading }) {
  return (
    <div className={styles.container}>
      <TopNav onActionRequested={onActionRequested} stats={stats} isLoading={isLoading} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
