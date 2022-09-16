import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dataJSON from '../../../data.json';
import Link from '../../../src/components/Link';
import { wrapper } from '../../../src/store/store';

function TrackPage({ track }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper>
        <Image
          src={track.image}
          width={880}
          height={495}
          layout="responsive"
          priority
        />
        <Box sx={{ px: 8, py: 4 }}>
          <Box>
            <Typography align="left" variant="h3">
              {track.name}
            </Typography>
          </Box>
          <Stack direction="row" spacing={3}>
            <Typography align="left" variant="subtitle1">
              <strong>Location: </strong> {track.location}
            </Typography>

            <Typography align="left" variant="subtitle1">
              <strong>Type: </strong> {track.type}
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Category: </strong> {track.category}
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Version:</strong> 1.0
            </Typography>
          </Stack>
          <Box>
            <Typography align="left" variant="subtitle1">
              <strong>Credit:</strong> {track.credit}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" color="text.secondary">
              {track.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Link underline="none" href={track.downloadLink}>
              <Button variant="contained">Download</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: dataJSON.tracks.map((track) => ({
      params: { trackId: track.id },
    })),
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => (context) => {
  const trackId = context.params.trackId;
  return {
    props: { track: dataJSON.tracks.find((track) => track.id === trackId) },
  };
});

export default TrackPage;
