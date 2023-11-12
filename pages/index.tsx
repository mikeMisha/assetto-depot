import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Copyright from '../src/components/Copyright';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '400px',
          height: '100%',
          background: `linear-gradient(90deg, rgba(78,78,78,0.7) 0%, rgba(78,78,78,1) 100%), url(/images/ac-bg.jpeg) no-repeat center / cover `,
        }}
      >
        <Box
          sx={{
            px: 8,
            maxWidth: '2000px',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ my: 5, width: '100%' }}>
            <Typography
              variant="h2"
              color="secondary"
              sx={{ textAlign: 'center' }}
              gutterBottom
            >
              Your source for
              <br />
              Assetto Corsa
              <Box component="span" color="primary.main">
                {' '}
                mods!
              </Box>
            </Typography>
            <Divider
              sx={{
                borderBottomWidth: 5,
                borderColor: 'primary.main',
                opacity: '1',
              }}
            />
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',

                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center' },
              }}
            >
              <Link href="/tracks">
                <Button
                  color="primary"
                  size="large"
                  sx={{
                    whiteSpace: 'nowrap',
                    mb: { xs: 3, sm: 0 },
                    transition: 'all 0.2s ease-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  variant="contained"
                >
                  VIEW TRACKS
                </Button>
              </Link>
              <Divider
                sx={{
                  borderColor: 'primary.main',
                  opacity: 1,
                  mx: 3,
                  display: { xs: 'none', sm: 'block' },
                }}
                orientation="vertical"
                flexItem
              />
              <Link href="/cars">
                <Button
                  sx={{
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  VIEW CARS
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Copyright />
    </>
  );
}
