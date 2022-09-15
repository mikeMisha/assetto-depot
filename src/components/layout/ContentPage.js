import Search from './Search';
import { useState, useEffect, useLayoutEffect } from 'react';
import ContentList from './ContentList';
import ContentPagination from './/ContentPagination';
import useCurrentPaginationData from '../../hooks/useCurrentPaginationData';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPage,
  setIsSingleCol,
  setSortedData,
  setSortValue,
  setPageSize,
} from '../../store/slices/paginationSlice';

import ContentItem from './ContentItem';
import { Typography, Box } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const ContentPage = ({ data, ItemComponent }) => {
  console.log(data);
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
        dataCopy.sort((a, b) => b.likes.localeCompare(a.likes));
        break;
      case 'most downloads':
        dataCopy.sort((a, b) => b.downloads.localeCompare(a.downloads));
        break;
      case 'a-z':
        dataCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return dataCopy;
  };
  useLayoutEffect(() => {
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
  if (currentPaginationData.length === 0) {
    return (
      <Box
        sx={{
          my: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SentimentVeryDissatisfiedIcon fontSize="large" color="primary" />
        <Typography variant="h4" align="center">
          No Results Found
        </Typography>
      </Box>
    );
  }
  return (
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
          {currentPaginationData.map((item) => (
            <ContentItem isSingleCol={isSingleCol} key={item.id} data={item} />
          ))}
        </ContentList>
      </ContentPagination>
    </>
  );
};

export default ContentPage;
