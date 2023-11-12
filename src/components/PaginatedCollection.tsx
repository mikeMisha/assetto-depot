import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentList from './ContentList';
import ContentPagination from './ContentPagination';
import useCurrentPaginationData from '../hooks/useCurrentPaginationData';
import ContentCard from './ContentCard';
import NoResults from './NoResults';
import Skeleton from '@mui/material/Skeleton';
import {
  setCurrentPage,
  setIsSingleCol,
  setSortedData,
  setSortValue,
  setPageSize,
} from '../store/slices/paginationSlice';
import type { RootState } from '../store/store';
import type { PaginationState } from '../store/slices/paginationSlice';
import type { SelectChangeEvent } from '@mui/material/Select';

interface PaginatedCollectionProps {
  dataType: string;
  data: any[];
  hasResults: boolean;
}
type SortValue = 'top rated' | 'most downloads' | 'a-z';

const PaginatedCollection = (props: PaginatedCollectionProps) => {
  const { dataType, data, hasResults } = props;

  const dispatch = useDispatch();
  const isSingleCol = useSelector(
    (state: RootState) => state.pagination.isSingleCol
  );
  const pageSize = useSelector((state: RootState) => state.pagination.pageSize);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const sortValue = useSelector(
    (state: RootState) => state.pagination.sortValue
  );
  const sortedData = useSelector(
    (state: RootState) => state.pagination.sortedData
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSingleCol(window.innerWidth < 900);
      window.addEventListener('resize', () =>
        window.innerWidth < 900 ? setIsSingleCol(true) : setIsSingleCol(false)
      );
    }
  }, []);
  const sortData = (sortValue: PaginationState['sortValue']) => {
    const dataCopy = [...data];

    switch (sortValue) {
      case 'top rated':
        dataCopy.sort((a, b) => b.likes - a.likes);
        break;
      case 'most downloads':
        dataCopy.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'a-z':
        dataCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return dataCopy;
  };
  useEffect(() => {
    dispatch(setSortedData(sortData(sortValue)));
  }, [sortValue, data]);

  const currentPaginationData = useCurrentPaginationData({
    data: sortedData || [],
    pageSize,
    currentPage,
  });

  const updatePerPage = (event: SelectChangeEvent) => {
    const pageSize = parseInt(event.target.value);
    dispatch(setPageSize(pageSize));
    dispatch(setCurrentPage(1));
  };

  const updatePage = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleColChange = (bool: boolean) => {
    dispatch(setIsSingleCol(bool));
  };

  const handleSort = (event: SelectChangeEvent) => {
    type SortValue = 'top rated' | 'most downloads' | 'a-z';

    const isSortValue = (value: any): value is SortValue => {
      return ['top rated', 'most downloads', 'a-z'].includes(value);
    };

    const value = event.target.value;

    if (isSortValue(value)) {
      dispatch(setSortValue(value));
    } else {
      // Handle the unexpected value
      console.error('Invalid sort option:', value);
    }
  };

  const renderSkeleton = (amount: number) => {
    return [...Array(pageSize)].map((item, i) => {
      return (
        <Skeleton
          key={i}
          variant="rectangular"
          sx={{ width: '100%', paddingTop: '60%' }}
        />
      );
    });
  };

  return hasResults ? (
    <>
      <ContentPagination
        data={data}
        isSingleCol={isSingleCol}
        pageSize={pageSize}
        currentPage={currentPage}
        updatePerPage={updatePerPage}
        updatePage={updatePage}
        handleColChange={handleColChange}
        handleSort={handleSort}
        sortValue={sortValue}
      >
        <ContentList isSingleCol={isSingleCol}>
          {!currentPaginationData?.length
            ? renderSkeleton(pageSize)
            : currentPaginationData.map((item: any) => (
                <ContentCard
                  isSingleCol={isSingleCol}
                  key={item.id}
                  data={item}
                  dataType={dataType}
                />
              ))}
        </ContentList>
      </ContentPagination>
    </>
  ) : (
    <NoResults />
  );
};

export default PaginatedCollection;
