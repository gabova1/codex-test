import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

export default function useDashboardData() {
  const { data, error, mutate, isLoading } = useSWR('/api/dashboard', fetcher, {
    refreshInterval: 30_000
  });

  return {
    data,
    isLoading,
    isError: Boolean(error),
    refresh: () => mutate()
  };
}
