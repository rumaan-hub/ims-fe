import { useMemo } from 'react';

function useLoader(data: { data: any[] } | null, loading: boolean, defaultCount = 8) {
  const loaderCount = useMemo(() => {
    return data?.data && data?.data?.length > 0 ? data?.data?.length : defaultCount;
  }, [data, defaultCount]);

  const shouldShowLoader = useMemo(() => {
    return loading || !data?.data || data?.data?.length === 0;
  }, [loading, data]);

  return { loaderCount, shouldShowLoader };
}

export default useLoader;
