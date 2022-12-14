import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import formatNumber from '../lib/formatNumber';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import DownloadBtn from './DownloadBtn';

const ContentCard = ({ dataType, data, isSingleCol }) => {
  const router = useRouter().pathname.split('/')[1];

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: '1',
        width: '100%',
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '1',
        }}
      >
        <Box
          component="div"
          sx={{
            width: '100%',
          }}
        >
          <Image
            width={880}
            height={495}
            layout="responsive"
            priority
            src={data.image}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: isSingleCol
              ? { xs: 'center', sm: 'space-between' }
              : 'center',
            flexWrap: 'wrap',
            flexDirection: isSingleCol ? { xs: 'column', sm: 'row' } : 'column',
          }}
        >
          <CardContent sx={{ maxWidth: '800px', pb: 0 }}>
            <Typography variant="h5" align="center">
              {data.name}
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="text"
              sx={{ mb: 1 }}
            >
              Credit: {data.credit}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'bottom',
                mt: 1,
              }}
            >
              <Typography variant="icon" sx={{ mr: 2 }}>
                <ThumbUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                {data.likes}
              </Typography>
              <Typography variant="icon" sx={{ mr: 2 }}>
                <ThumbDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                {data.dislikes}
              </Typography>
              <Typography variant="icon">
                <FileDownloadIcon fontSize="small" sx={{ mr: 0.5 }} />
                {formatNumber(data.downloads)}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'center', p: 2 }}
            >
              <Link
                underline="none"
                href={
                  dataType == 'cars'
                    ? `${data.brand}/${data.id}`
                    : `tracks/${data.id}`
                }
              >
                <Button variant="contained">Details</Button>
              </Link>
              <DownloadBtn
                type={router}
                link={data.downloadLink}
                typeId={data.id}
                downloads={data.downloads}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ContentCard;
