import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '@/styles/Home.module.css';

const renderTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0];
  return (
    <div className={styles.chartTooltip}>
      <p className={styles.chartTooltipLabel}>{label}</p>
      <p className={styles.chartTooltipValue}>{point.value} SOL</p>
    </div>
  );
};

export default function OverviewCharts({ history, aggregations, isLoading }) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.panelTitle}>SOL Launchpad Volume</p>
          <p className={styles.panelSubtitle}>24h rolling performance</p>
        </div>
      </header>
      <div className={styles.chartWrapper}>
        {isLoading && <p className={styles.placeholder}>Loading charts…</p>}
        {!isLoading && history?.length === 0 && <p className={styles.placeholder}>No chart data.</p>}
        {!isLoading && history?.length > 0 && (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={history} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33ffce" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#33ffce" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={renderTooltip} cursor={{ stroke: '#334155', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="volume" stroke="#33ffce" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className={styles.chartFooter}>
        <div>
          <p className={styles.metricLabel}>Total Launches (24h)</p>
          <p className={styles.metricValueLarge}>{aggregations?.launches24h ?? '—'}</p>
        </div>
        <div>
          <p className={styles.metricLabel}>Average Raise</p>
          <p className={styles.metricValueLarge}>{aggregations?.averageRaise ? `$${aggregations.averageRaise}` : '—'}</p>
        </div>
        <div>
          <p className={styles.metricLabel}>Median Raise</p>
          <p className={styles.metricValueLarge}>{aggregations?.medianRaise ? `$${aggregations.medianRaise}` : '—'}</p>
        </div>
      </div>
    </section>
  );
}
