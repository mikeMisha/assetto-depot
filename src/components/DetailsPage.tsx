import React from 'react';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import LikeDislike from './LikeDislike';
import titleCase from '../lib/titleCase';
import DownloadBtn from './DownloadBtn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import formatNumber from '../lib/formatNumber';

interface DetailsPageProps {
  data: {
    id: string;
    name: string;
    credit?: string;
    image?: string;
    likes?: number;
    dislikes?: number;
    downloads?: number;
    downloadLink?: string;
    brand?: string;
    location?: string;
    category?: string;
    trans?: string;
    version?: string;
    type: 'cars' | 'tracks';
    description?: string;
  };
}

function DetailsPage({ data }: DetailsPageProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 5, bgcolor: '#dee2e6', width: '100%', height: '100%' }}
    >
      <Paper>
        <Image
          src={data.image || '/images/placeholder.png'}
          width={880}
          height={495}
          layout="responsive"
          priority
        />
        <Box sx={{ px: 8, py: 4 }}>
          <Box>
            <Typography align="left" variant="h2">
              {data.name}
            </Typography>
          </Box>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0 }}
            sx={{ flexWrap: 'wrap', alignItems: 'center' }}
          >
            <LikeDislike
              data={{
                id: data.id,
                likes: data.likes || 0,
                dislikes: data.dislikes || 0,
              }}
              type={data.type}
            />
            <Typography>
              <FileDownloadIcon fontSize="small" sx={{ ml: 3, mr: 1.5 }} />
              {formatNumber(data.downloads || 0)}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 3 }}
            sx={{ flexWrap: 'wrap' }}
          >
            <Typography align="left" variant="subtitle1">
              <strong>Credit:</strong> {data.credit}
            </Typography>

            {data.location && (
              <Typography align="left" variant="subtitle1">
                <strong>Location: </strong> {data.location}
              </Typography>
            )}

            {data.type && (
              <Typography align="left" variant="subtitle1">
                <strong>Type: </strong> {data.type}
              </Typography>
            )}

            <Typography align="left" variant="subtitle1">
              <strong>Category: </strong> {data.category}
            </Typography>

            {data.brand && (
              <Typography align="left" variant="subtitle1">
                <strong>Brand: </strong> {titleCase(data.brand)}
              </Typography>
            )}

            {data.trans && (
              <Typography align="left" variant="subtitle1">
                <strong>Transmission: </strong> {data.trans}
              </Typography>
            )}

            {data.version && (
              <Typography align="left" variant="subtitle1">
                <strong>Version:</strong> {data.version}
              </Typography>
            )}
          </Stack>
          {data.description && (
            <Box>
              <Typography variant="body1" color="text.secondary">
                {data.description}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <DownloadBtn
              type={data.type}
              link={data.downloadLink || ''}
              typeId={data.id}
              downloads={data.downloads || 0}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default DetailsPage;
