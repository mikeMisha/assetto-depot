import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '../src/components/Link';
import Divider from '@mui/material/Divider';
import Copyright from '../src/components/Copyright';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled, alpha } from '@mui/material/styles';
import Image from 'next/image';
import { width } from '@mui/system';

export default function Index() {
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
          <Box sx={{ my: 5, width: '70%' }}>
            <Typography
              variant="h2"
              color="secondary"
              sx={{ textAlign: 'center' }}
              gutterBottom
            >
              Go to database for all Assetto Corssa{' '}
              <Box component="span" color="primary.main">
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
              <Button
                sx={{
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
            </Box>
          </Box>
        </Box>
      </Box>

      <Copyright />
    </>
  );
}
