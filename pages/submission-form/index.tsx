import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

function SubmissionPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          px: 5,
          background: `linear-gradient(90deg, rgba(203,213,225,0.9) 0%, rgba(203,213,225,0.9) 100%), url(/images/ac-bg.jpeg) no-repeat center / cover `,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          What type of mod would you like to submit?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <Link
            component={NextLink}
            href="/submission-form/tracks"
            sx={{ textDecoration: 'none' }}
          >
            <Button
              color="primary"
              size="large"
              sx={{
                whiteSpace: 'nowrap',
                mb: 2,
                width: '100%',
                fontSize: '1.5rem',
                transitionDuration: '100ms',
                transition: ' all 0.2s ease-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              variant="contained"
            >
              tracks
            </Button>
          </Link>
          <Link
            component={NextLink}
            href="/submission-form/car"
            sx={{ textDecoration: 'none' }}
          >
            <Button
              color="primary"
              size="large"
              sx={{
                whiteSpace: 'nowrap',
                width: '100%',
                fontSize: '1.5rem',
                transition: ' all 0.2s ease-in',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              variant="contained"
            >
              CARS
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SubmissionPage;
