import { useEffect, useState } from 'react';
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
import type { SelectChangeEvent } from '@mui/material/Select';
import { DataCategory } from '../types/global';
import axios from 'axios';

interface PaginatedCollectionProps {
  dataCategory: DataCategory;
  data: any[];
  hasResults: boolean;
}

// Type definition for sorting options
type SortValue = 'top rated' | 'most downloads' | 'a-z';

const PaginatedCollection = (props: PaginatedCollectionProps) => {
  const { dataCategory, data, hasResults } = props;
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useState(true);

  // Redux dispatch and state selectors
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

  // Custom hook to manage current pagination data
  const currentPaginationData = useCurrentPaginationData({
    data: sortedData || [],
    pageSize,
    currentPage,
  });

  useEffect(() => {
    const fetchLikesDislikes = async () => {
      const updatedProducts = await Promise.all(
        currentPaginationData.map(async (item) => {
          try {
            const response = await axios.get('/api/likes-dislikes', {
              params: { id: item.id, type: dataCategory },
            });
            return { ...item, ...response.data };
          } catch (error) {
            console.error(
              'Error fetching likes/dislikes for product:',
              item.id,
              error
            );
            return item; // Return the product without updated likes/dislikes in case of error
          }
        })
      );

      setItems(updatedProducts);
      setLoading(false);
    };

    fetchLikesDislikes();
  }, [currentPaginationData]);

  // Effect for handling window resize and setting single column layout
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSingleCol(window.innerWidth < 900));
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Function to sort data based on the selected sort value
  const sortData = (sortValue: SortValue) => {
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
      default:
        break;
    }

    return dataCopy;
  };

  // Effect to sort data whenever sortValue or data changes
  useEffect(() => {
    dispatch(setSortedData(sortData(sortValue)));
  }, [sortValue, data, dispatch]);

  // Handler for column change
  const handleColChange = (bool: boolean) => {
    dispatch(setIsSingleCol(bool));
  };

  // Handlers for pagination and sorting changes
  const updatePerPage = (event: SelectChangeEvent) => {
    dispatch(setPageSize(parseInt(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  const updatePage = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };
  const isSortValue = (value: any): value is SortValue => {
    return ['top rated', 'most downloads', 'a-z'].includes(value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    const value = event.target.value;

    if (isSortValue(value)) {
      dispatch(setSortValue(value));
    } else {
      console.error('Invalid sort option:', value);
    }
  };

  // Function to render loading skeletons
  const renderSkeleton = (amount: number) =>
    [...Array(amount)].map((_, i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        sx={{ width: '100%', paddingTop: '60%' }}
      />
    ));

  // Main component rendering logic
  return hasResults ? (
    <>
      <ContentPagination
        data={data}
        isSingleCol={isSingleCol}
        pageSize={pageSize}
        currentPage={currentPage}
        updatePerPage={updatePerPage}
        updatePage={updatePage}
        handleSort={handleSort}
        handleColChange={handleColChange}
        sortValue={sortValue}
      >
        <ContentList isSingleCol={isSingleCol}>
          {loading
            ? renderSkeleton(pageSize)
            : currentPaginationData.map((item: any) => (
                <ContentCard
                  key={item.id}
                  isSingleCol={isSingleCol}
                  data={item}
                  dataCategory={dataCategory}
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
