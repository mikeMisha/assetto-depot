// pages/api/bulk-likes-dislikes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/lib/initSupabase';

type LikeDislikeData = {
  id: number;
  likes: number;
  dislikes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { ids, type } = req.query;

    // Ensure 'ids' is a valid comma-separated string
    if (typeof ids !== 'string' || !ids) {
      res
        .status(400)
        .json({ message: 'Invalid or missing "ids" query parameter.' });
      return;
    }

    // Convert 'ids' to an array of numbers
    const idArray = ids.split(',').map(Number);

    // Fetch likes and dislikes from Supabase
    const { data, error } = await supabase
      .from(type as string)
      .select('id, likes, dislikes')
      .in('id', idArray);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching bulk likes/dislikes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
