import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/lib/initSupabase';

interface ApiResponse {
  likes?: number;
  dislikes?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id, type } = req.query;

  if (!id || Array.isArray(id) || !type || Array.isArray(type)) {
    res.status(400).json({ error: 'Invalid request parameters' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from(type)
      .select('likes, dislikes')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({ likes: data.likes, dislikes: data.dislikes });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
