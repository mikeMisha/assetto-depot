import { supabase } from '../../src/lib/initSupabase';

async function handler(req, res) {
  const { likes, dislikes, type, typeId } = req.body;

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from(type)
      .update({ likes, dislikes })
      .eq('id', typeId);
    console.log(data);
    console.error(error);
  }
  res.status(200).json({ message: 'Interaction updated' });
}

export default handler;
