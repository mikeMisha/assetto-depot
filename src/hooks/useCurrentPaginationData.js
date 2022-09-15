import { useMemo } from 'react';

/** this hook returns list of blog posts based on current pagination page & current page size  */

function useCurrentPaginationData({ data, currentPage, pageSize }) {
  const slicedData = useMemo(() => {
    const start = (currentPage - 1 || 0) * pageSize;
    const end = currentPage * pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  return slicedData;
}

export default useCurrentPaginationData;
