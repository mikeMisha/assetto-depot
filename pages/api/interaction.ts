import { supabase } from '../../src/lib/initSupabase';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { likes, dislikes, type, typeId } = req.body;

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from(type)
      .update({ likes, dislikes })
      .eq('id', typeId);
    console.error(error);
  }
  res.status(200).json({ message: 'Interaction updated' });
}

export default handler;
