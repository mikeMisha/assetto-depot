import { supabase } from '../../src/lib/initSupabase';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { liked, disliked, dataCategory, id } = req.body;
  console.log('req.body', req.body);
  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from(dataCategory)
      .update({ liked, disliked })
      .eq('id', id);
    console.error(error);
    console.error('data', data);
  }
  res.status(200).json({ message: 'Interaction updated' });
}

export default handler;
