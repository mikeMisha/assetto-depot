import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import makeExcerpt from '../utils/makeExcerpt';
import formatNumber from '../utils/formatNumber';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const ContentItem = ({ data, isSingleCol }) => {
  const router = useRouter();

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
            {/**<Typography
            variant="body2"
            sx={{
              mb: 1,
              overflowWrap: 'break-all',
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              hyphens: 'auto',
              display: 'inline-block',
            }}
            color="text.secondary"
          >
            {makeExcerpt(data.trackDesc, isSingleCol ? 400 : 100)}
          </Typography> 

            <Stack
              direction="row"
              sx={{ justifyContent: 'center' }}
              spacing={1}
            >
              {data.tags.map((tag, i) => (
                <Chip
                  key={i}
                  sx={{ bgcolor: 'secondary.main' }}
                  label={tag}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
            **/}
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

            <CardActions sx={{ p: 2, justifyContent: 'center' }}>
              <Link underline="none" href={`/tracks/${data.id}`}>
                <Button variant="contained">Details</Button>
              </Link>
              <Link underline="none" href={data.downloadLink}>
                <Button variant="contained">Download</Button>
              </Link>
            </CardActions>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ContentItem;
