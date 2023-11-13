import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import titleCase from '../lib/titleCase';
import DownloadBtn from './DownloadBtn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import formatNumber from '../lib/formatNumber';
import type { Track, Car, DataCategory } from '../types/global';
import LikeDislike from './LikeDislike';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DetailsPageProps {
  data: Track | Car;
  dataCategory: DataCategory;
}

function DetailsPage({ data, dataCategory }: DetailsPageProps) {
  const [item, setItem] = useState<Track | Car>(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamicData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/likes-dislikes', {
          params: {
            id: item.id,
            type: dataCategory,
          },
        });
        setItem({ ...item, ...response.data });
      } catch (error) {
        console.error('Error fetching dynamic data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicData();
  }, [data]);

  return (
    <div style={{ backgroundColor: '#dee2e6', height: '100%' }}>
      <Container
        maxWidth="lg"
        sx={{ pt: 5, bgcolor: '#dee2e6', width: '100%', height: '100%' }}
      >
        <>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="70%"
            />
          ) : (
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

                <Stack direction="row" spacing={1}>
                  <LikeDislike
                    data={{
                      id: data.id,
                      likes: item.likes || 0,
                      dislikes: item.dislikes || 0,
                    }}
                    dataCategory={dataCategory}
                  />
                  <Typography sx={{ mr: 2 }}>Downloads:</Typography>
                  {formatNumber(data.downloads || 0)}
                  <FileDownloadIcon fontSize="small" />
                </Stack>

                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={{ xs: 0, md: 3 }}
                  sx={{ flexWrap: 'wrap' }}
                >
                  <Typography align="left" variant="subtitle1">
                    <strong>Credit:</strong> {data.credit}
                  </Typography>

                  {dataCategory === 'tracks' && (
                    <Typography align="left" variant="subtitle1">
                      <strong>Location: </strong> {(data as Track).location}
                    </Typography>
                  )}

                  {dataCategory === 'tracks' && (
                    <Typography align="left" variant="subtitle1">
                      <strong>Track type: </strong> {(data as Track).trackType}
                    </Typography>
                  )}

                  <Typography align="left" variant="subtitle1">
                    <strong>Category: </strong> {data.category}
                  </Typography>

                  {data.brand && (
                    <Typography align="left" variant="subtitle1">
                      <strong>Brand: </strong> {titleCase(data.brand || '')}
                    </Typography>
                  )}

                  {data.trans && (
                    <Typography align="left" variant="subtitle1">
                      <strong>Transmission: </strong> {data.trans}
                    </Typography>
                  )}

                  {dataCategory === 'tracks' && (
                    <Typography align="left" variant="subtitle1">
                      <strong>Version:</strong> {(data as Track).version}
                    </Typography>
                  )}
                </Stack>
                {dataCategory === 'tracks' && (
                  <Box>
                    <Typography variant="body1" color="text.secondary">
                      {(data as Track).description}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <DownloadBtn
                    dataCategory={dataCategory}
                    link={data.downloadLink || ''}
                    typeId={data.id}
                    downloads={data.downloads || 0}
                  />
                </Box>
              </Box>
            </Paper>
          )}
        </>
      </Container>
    </div>
  );
}

export default DetailsPage;
