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

function DetailsPage({ data, type }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper>
        <Image
          src={data.image}
          width={880}
          height={495}
          layout="responsive"
          priority
        />
        <Box sx={{ px: 8, py: 4 }}>
          <Box>
            <Typography align="left" variant="h3">
              {data.name}
            </Typography>
          </Box>
          <LikeDislike data={data} type={type} />
          <Typography variant="icon">
            <FileDownloadIcon fontSize="small" sx={{ mr: 0.5 }} />
            {formatNumber(data.downloads)}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography align="left" variant="subtitle1">
              <strong>Credit:</strong> {data.credit}
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Location: </strong> {data.location}
            </Typography>
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
              type={type}
              link={data.downloadLink}
              typeId={data.id}
              downloads={data.downloads}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default DetailsPage;
