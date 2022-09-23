import { supabase } from '../../src/lib/initSupabase';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { downloads, type, typeId } = req.body;
    const { data, error } = await supabase
      .from(type)
      .update({ downloads })
      .eq('id', typeId);
    console.log(data);
    console.error(error);
  }
  res.status(200).json({ message: 'download tallied' });
}

export default handler;
