import { useEffect, useState } from 'react';

const useFetchStatus = (loading: boolean) => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!loading) {
      setHasFetched(true);
    }
  }, [loading]);

  return hasFetched;
};

export default useFetchStatus;
