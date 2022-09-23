import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentList from './ContentList';
import ContentPagination from './/ContentPagination';
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

const ContentPage = ({ dataType, data, userSearched, hasResults }) => {
  const dispatch = useDispatch();
  const isSingleCol = useSelector((store) => store.pagination.isSingleCol);
  const pageSize = useSelector((store) => store.pagination.pageSize);
  const currentPage = useSelector((store) => store.pagination.currentPage);
  const sortValue = useSelector((store) => store.pagination.sortValue);
  const sortedData = useSelector((store) => store.pagination.sortedData);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSingleCol(window.innerWidth < 900);
      window.addEventListener('resize', () =>
        window.innerWidth < 900 ? setIsSingleCol(true) : setIsSingleCol(false)
      );
    }
  }, []);
  const sortData = (sortValue) => {
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
    data: sortedData,
    pageSize,
    currentPage,
  });

  const updatePerPage = (event) => {
    dispatch(setPageSize(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const updatePage = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  const handleColChange = (bool) => {
    dispatch(setIsSingleCol(bool));
  };
  const handleSort = (e) => {
    dispatch(setSortValue(e.target.value));
  };
  const renderSkeleton = (amount) => {
    return [...Array(pageSize)].map((item, i) => {
      return (
        <Skeleton
          key={i}
          variant="rounded"
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
            : currentPaginationData.map((item) => (
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

export default ContentPage;
