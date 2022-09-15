import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const dummyData = [
  {
    id: '1',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },

  {
    id: '2',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '3',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '4',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '5',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '6',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
];

function CarPage({ car }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper>
        <Image
          src={car.image}
          width={880}
          height={495}
          layout="responsive"
          priority
        />
        <Box sx={{ px: 8, py: 4 }}>
          <Box>
            <Typography align="left" variant="h3">
              {car.name}
            </Typography>
          </Box>
          <Stack direction="row" spacing={3}>
            <Typography align="left" variant="subtitle1">
              <strong>Location: </strong> Tokyo, Japan
            </Typography>

            <Typography align="left" variant="subtitle1">
              <strong>Length: </strong> 1000m
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Type: </strong> {car.type}
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Category: </strong> {car.category}
            </Typography>
            <Typography align="left" variant="subtitle1">
              <strong>Version:</strong> 1.0
            </Typography>
          </Stack>
          <Box>
            <Typography align="left" variant="subtitle1">
              <strong>Credit:</strong> {car.credit}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              <strong>Tags:</strong>
            </Typography>
            <Stack
              direction="row"
              sx={{ justifyContent: 'center' }}
              spacing={1}
            >
              {car.tags.map((tag, i) => (
                <Chip key={i} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              {car.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button size="large" variant="contained">
              Download
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export function getStaticPaths() {
  return {
    fallback: false,

    paths: dummyData.map((car) => ({
      params: { brandName: car.brand, carId: car.id },
    })),
  };
}

export function getStaticProps(context) {
  const carId = context.params.carId;
  return {
    props: { car: dummyData.find((car) => car.id === carId) },
  };
}

export default CarPage;
