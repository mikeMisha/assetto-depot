import { supabase } from '../../src/lib/initSupabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { dataCategory } from '../../src/types/global';
// Define the expected request body type
interface RequestBody {
  itemIds: number[];
  dataCategory: dataCategory;
}

// Define the response type
interface ItemLikeDislike {
  id: number;
  likes: number;
  dislikes: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemLikeDislike[] | { error: string }>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { itemIds, dataCategory } = req.body as RequestBody;

  // Fetch likes and dislikes from Supabase
  try {
    const { data, error } = await supabase
      .from(dataCategory) // Replace with your table name
      .select('id, likes, dislikes')
      .in('id', itemIds);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
