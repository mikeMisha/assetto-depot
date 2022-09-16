import Box from '@mui/system/Box';
import { useState, useEffect, Children } from 'react';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import useCurrentPaginationData from '../hooks/useCurrentPaginationData';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Button from '@mui/material/Button';
import { TryRounded } from '@mui/icons-material';

const ContentList = ({
  children,
  isSingleCol = false,
  colBreakPoints = [1, 2, 3],
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'background.main',
        }}
      >
        <Box sx={{ width: '1600px' }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              my: 3,
              gridTemplateColumns: {
                xs: `repeat(${colBreakPoints[0]}, 1fr)`,
                md: `repeat(${isSingleCol ? '1' : colBreakPoints[1]}, 1fr)`,
                lg: `repeat(${isSingleCol ? '1' : colBreakPoints[2]}, 1fr)`,
              },
              '@media (max-width:1800px)': {
                mx: '10%',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContentList;
