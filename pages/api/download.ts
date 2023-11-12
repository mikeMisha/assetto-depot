import { supabase } from '../../src/lib/initSupabase';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { downloads, type, typeId } = req.body;
    const { data, error } = await supabase
      .from(type)
      .update({ downloads })
      .eq('id', typeId);
    console.error(error);
  }
  res.status(200).json({ message: 'download tallied' });
}

export default handler;
