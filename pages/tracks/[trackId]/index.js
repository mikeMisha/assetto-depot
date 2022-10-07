import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '../../../src/components/Link';
import { wrapper } from '../../../src/store/store';
import { supabase } from '../../../src/lib/initSupabase';
import DetailsPage from '../../../src/components/DetailsPage';

function TrackPage({ track, type }) {
  return <DetailsPage type={type} data={track} />;
}

export async function getStaticPaths() {
  const { data: tracks, error } = await supabase.from('tracks').select();

  if (error) console.log('error', error);
  else
    return {
      fallback: false,
      paths: tracks.map((track) => ({
        params: { trackId: track.id.toString() },
      })),
    };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const trackId = context.params.trackId;
    const { data: track, error } = await supabase
      .from('tracks')
      .select()
      .eq('id', trackId);
    return {
      props: { track: track[0], type: 'tracks' },
      revalidate: 10,
    };
  }
);

export default TrackPage;
