import { useMemo } from 'react';
import { Track, Car } from '../types/global';
/** this hook returns list of items based on current pagination page & current page size  */

interface useCurrentPaginationDataProps {
  data: Track[] | Car[] | [];
  currentPage: number;
  pageSize: number;
}

function useCurrentPaginationData(props: useCurrentPaginationDataProps) {
  const { data, currentPage, pageSize } = props;
  const slicedData = useMemo(() => {
    const start = (currentPage - 1 || 0) * pageSize;
    const end = currentPage * pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  return slicedData;
}

export default useCurrentPaginationData;
