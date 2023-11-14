import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentList from './ContentList';
import ContentPagination from './ContentPagination';
import ContentCard from './ContentCard';
import NoResults from './NoResults';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router';
import {
  setCurrentPage,
  setIsSingleCol,
  setSortValue,
  setPageSize,
} from '../store/slices/paginationSlice';
import type { RootState } from '../store/store';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DataCategory, SortValue } from '../types/global';
import axios from 'axios';
import { Track, Car } from '../types/global';

interface PaginatedCollectionProps {
  dataCategory: DataCategory;
  data: Track[] | Car[] | string[];
  hasResults: boolean;
}

type SortedLikedData =
  | (Track & { likes?: number; dislikes?: number })
  | (Car & { likes?: number; dislikes?: number });

const PaginatedCollection = (props: PaginatedCollectionProps) => {
  const { dataCategory, data, hasResults } = props;
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState<SortedLikedData[]>([]);
  const [likesDislikesData, setLikesDislikesData] = useState<SortedLikedData[]>(
    []
  ); // New state for likes/dislikes
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state selectors
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

  // Sort data based on sortValue
  useEffect(() => {
    const sorted = sortData(data as Track[] | Car[], sortValue);
    const start = (currentPage - 1 || 0) * pageSize;
    const end = currentPage * pageSize;
    const sliced = sorted.slice(start, end);
    if (currentPage > Math.ceil(data.length / pageSize)) {
      dispatch(setCurrentPage(1));
    }

    setDisplayData(sliced);
  }, [data, sortValue, currentPage, pageSize]);

  // Fetch likes/dislikes for the display data
  useEffect(() => {
    if (hasResults && displayData.length > 0) {
      fetchLikesDislikes();
    }
  }, [displayData, hasResults]);

  // Function to fetch likes/dislikes
  const fetchLikesDislikes = async () => {
    setLoading(true);
    try {
      const updatedData = await Promise.all(
        displayData.map(async (item) => {
          const response = await axios.get('/api/likes-dislikes', {
            params: { id: item.id, type: dataCategory },
          });
          return { ...item, ...response.data };
        })
      );
      setLikesDislikesData(updatedData); // Update likes/dislikes state
    } catch (error) {
      console.error('Error fetching likes/dislikes:', error);
    }
    setLoading(false);
  };

  // Sort function
  const sortData = (dataToSort: Track[] | Car[], sortValue: SortValue) => {
    const dataCopy = [...dataToSort];

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

  // Fetch likes/dislikes when the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (hasResults && displayData.length > 0) {
        fetchLikesDislikes();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, displayData, hasResults, fetchLikesDislikes]);

  // Function to render loading skeletons
  const renderSkeleton = (amount: number) =>
    [...Array(amount)].map((_, i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        sx={{ width: '100%', paddingTop: '60%' }}
      />
    ));

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
  return hasResults ? (
    <>
      <ContentPagination
        data={data as Track[] | Car[]}
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
            : likesDislikesData.map((item: any) => (
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
