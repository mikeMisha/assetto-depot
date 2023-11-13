import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import type { DataCategory } from '../types/global';
// Define the props and other types
export interface LikeDislikeProps {
  id: string;
  likes: number;
  dislikes: number;
}

interface InteractionItem {
  id: string;
  reaction: 'like' | 'dislike' | null;
  previousReaction: 'like' | 'dislike' | null;
}

interface StoredInteractions {
  [key: string]: InteractionItem[];
}

// useLikeDislike hook
const useLikeDislike = (
  initialData: LikeDislikeProps,
  dataCategory: DataCategory
) => {
  const [likes, setLikes] = useState<number>(initialData.likes);
  const [dislikes, setDislikes] = useState<number>(initialData.dislikes);
  const [likeActive, setLikeActive] = useState<boolean>(false);
  const [dislikeActive, setDislikeActive] = useState<boolean>(false);

  const updateLocalStorageAndApi = useCallback(
    (interaction: InteractionItem) => {
      // Update local storage
      const localInteractionsStr = localStorage.getItem('interactions');
      const localInteractions: StoredInteractions = localInteractionsStr
        ? JSON.parse(localInteractionsStr)
        : {};
      const updatedInteractions =
        localInteractions[dataCategory]?.filter(
          (i) => i.id !== interaction.id
        ) || [];
      updatedInteractions.push(interaction);
      localStorage.setItem(
        'interactions',
        JSON.stringify({
          ...localInteractions,
          [dataCategory]: updatedInteractions,
        })
      );

      // Prepare payload for API call
      const payload = {
        dataCategory: dataCategory,
        id: interaction.id,
        reaction: interaction.reaction,
        previousReaction: interaction.previousReaction,
      };

      // Send API request
      axios.post('/api/interaction', payload).catch((err) => {
        console.error(
          err.response?.status === 404
            ? 'Resource could not be found!'
            : err.message
        );
      });
    },
    [dataCategory]
  );

  const debouncedUpdateLocalStorageAndApi = useCallback(
    debounce(updateLocalStorageAndApi, 500),
    [updateLocalStorageAndApi]
  );

  useEffect(() => {
    // Retrieve interaction from local storage
    const localInteractionsStr = localStorage.getItem('interactions');
    const localInteractions: StoredInteractions = localInteractionsStr
      ? JSON.parse(localInteractionsStr)
      : {};
    const interaction = localInteractions[dataCategory]?.find(
      (i) => i.id === initialData.id
    );

    // Set like/dislike active state based on local storage
    setLikeActive(interaction?.reaction === 'like');
    setDislikeActive(interaction?.reaction === 'dislike');
  }, [initialData, dataCategory]);

  const handleInteraction = useCallback(
    (type: 'like' | 'dislike') => {
      const isLike = type === 'like';
      const isCurrentlyActive = isLike ? likeActive : dislikeActive;
      const otherIsActive = isLike ? dislikeActive : likeActive;

      // Determine the previous reaction
      const previousReaction = likeActive
        ? 'like'
        : dislikeActive
        ? 'dislike'
        : null;

      // Update like/dislike counts and active states
      if (isLike) {
        setLikes((prev) => (isCurrentlyActive ? prev - 1 : prev + 1));
        setLikeActive(!isCurrentlyActive);

        if (otherIsActive) {
          setDislikes((prev) => prev - 1);
          setDislikeActive(false);
        }
      } else {
        setDislikes((prev) => (isCurrentlyActive ? prev - 1 : prev + 1));
        setDislikeActive(!isCurrentlyActive);

        if (otherIsActive) {
          setLikes((prev) => prev - 1);
          setLikeActive(false);
        }
      }

      // Update local storage and API
      debouncedUpdateLocalStorageAndApi({
        id: initialData.id,
        reaction: isCurrentlyActive ? null : type,
        previousReaction: previousReaction,
      });
    },
    [
      likes,
      dislikes,
      likeActive,
      dislikeActive,
      initialData.id,
      debouncedUpdateLocalStorageAndApi,
    ]
  );

  return {
    likes,
    dislikes,
    likeActive,
    dislikeActive,
    handleInteraction,
  };
};

export default useLikeDislike;
