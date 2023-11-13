import { supabase } from '../../src/lib/initSupabase';
import type { NextApiRequest, NextApiResponse } from 'next';

type ReactionRequestBody = {
  dataCategory: string;
  id: string;
  reaction: 'like' | 'dislike' | null; // Updated to include null
  previousReaction: 'like' | 'dislike' | null;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { dataCategory, id, reaction, previousReaction } =
      req.body as ReactionRequestBody;

    try {
      // Fetch current likes and dislikes
      const { data: currentData, error: fetchError } = await supabase
        .from(dataCategory)
        .select('likes, dislikes')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      let { likes, dislikes } = currentData;

      // Adjust likes and dislikes based on the reaction and previousReaction
      if (reaction === 'like') {
        likes++;
        if (previousReaction === 'dislike') {
          dislikes = Math.max(dislikes - 1, 0);
        }
      } else if (reaction === 'dislike') {
        dislikes++;
        if (previousReaction === 'like') {
          likes = Math.max(likes - 1, 0);
        }
      } else if (reaction === null) {
        // User retracts their previous reaction
        if (previousReaction === 'like') {
          likes = Math.max(likes - 1, 0);
        } else if (previousReaction === 'dislike') {
          dislikes = Math.max(dislikes - 1, 0);
        }
      }

      // Update the likes and dislikes in the database
      const { error: updateError } = await supabase
        .from(dataCategory)
        .update({ likes, dislikes })
        .eq('id', id);

      if (updateError) throw updateError;

      return res
        .status(200)
        .json({ message: 'Interaction updated', likes, dislikes });
    } catch (error) {
      console.error('Error updating interaction:', error);
      return res.status(500).json({ message: 'Error updating interaction' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
