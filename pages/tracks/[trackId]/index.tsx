import { supabase } from '../../../src/lib/initSupabase';
import DetailsPage from '../../../src/components/DetailsPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface Track {
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
}

// Define TypeScript interface for TrackPage props
interface TrackPageProps {
  track: Track;
}

function TrackPage(props: TrackPageProps) {
  const { track } = props;
  return <DetailsPage data={track} />;
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
    revalidate: 10,
  };
};

export default TrackPage;
