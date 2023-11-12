import React from 'react';
import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
function NoResults() {
  return (
    <Box
      sx={{
        my: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'secondary.main',
        py: '5%',
        mx: '20%',
        borderRadius: 5,
      }}
    >
      <SentimentVeryDissatisfiedIcon fontSize="large" color="primary" />
      <Typography variant="h4" align="center">
        No Results Found.
      </Typography>
      <br />

      <Typography variant="h6" align="center">
        Head to our submission page to add a cars or tracks!
      </Typography>
    </Box>
  );
}

export default NoResults;
