import { supabase } from '../../../src/lib/initSupabase';
import DetailsPage from '../../../src/components/DetailsPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Track } from '../../../src/types/global';

interface TrackPageProps {
  track: Track;
}

function TrackPage(props: TrackPageProps) {
  const { track } = props;
  return <DetailsPage data={track} dataCategory="tracks" />;
}

// Type for getStaticPaths context params
interface Params extends ParsedUrlQuery {
  trackId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: tracks, error } = await supabase.from<Track>('tracks').select();

  if (error) {
    console.log('error', error);
    // Provide a fallback or handle the error as needed
    return { paths: [], fallback: false };
  } else {
    return {
      fallback: false,
      paths: tracks.map((track) => ({
        params: { trackId: track.id.toString() },
      })),
    };
  }
};

export const getStaticProps: GetStaticProps<TrackPageProps, Params> = async (
  context: GetStaticPropsContext<Params>
) => {
  const trackId = context.params?.trackId;

  // If trackId is not defined, return an error state
  if (!trackId) {
    return { notFound: true };
  }

  const { data: track, error } = await supabase
    .from<Track>('tracks')
    .select()
    .eq('id', trackId)
    .single();

  if (error || !track) {
    return { notFound: true };
  }

  return {
    props: { track },
    revalidate: 60 * 60, // Revalidate once every hour
  };
};

export default TrackPage;
