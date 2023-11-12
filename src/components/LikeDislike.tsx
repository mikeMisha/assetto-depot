import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import axios from 'axios';
import { debounce, set } from 'lodash';

const thumbStyle = {
  mr: 0.5,
  '&:hover': { color: 'primary.main', cursor: 'pointer' },
};

interface LikeDislikeProps {
  data: {
    id: string;
    likes: number;
    dislikes: number;
  };
  type: 'tracks' | 'cars';
}

interface InteractionItem {
  id: string;
  liked: boolean;
  disliked: boolean;
}

interface StoredInteractions {
  [key: string]: InteractionItem[];
}

const LikeDislike = ({ data, type }: LikeDislikeProps) => {
  const [likes, setLikes] = useState(data.likes);
  const [dislikes, setDislikes] = useState(data.dislikes);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  // Ref to track if it's the initial load
  const isInitialLoad = useRef(true);

  // Migrate the local storage update to a separate function
  const updateLocalStorage = (interaction: InteractionItem) => {
    const localInteractionsStr = localStorage.getItem('interactions');
    const localInteractions: StoredInteractions = localInteractionsStr
      ? JSON.parse(localInteractionsStr)
      : {};

    const updatedItems =
      localInteractions[type]?.filter((i) => i.id !== interaction.id) || [];
    updatedItems.push(interaction);

    localStorage.setItem(
      'interactions',
      JSON.stringify({ ...localInteractions, [type]: updatedItems })
    );

    axios.post('/api/interaction', interaction).catch((err) => {
      console.error(
        err.response?.status === 404
          ? 'Resource could not be found!'
          : err.message
      );
    });
  };

  // Debounce the local storage update function
  const debouncedUpdateLocalStorage = debounce(updateLocalStorage, 300);

  // Effect for initializing the like/dislike active states from local storage
  useEffect(() => {
    const localInteractionsStr = localStorage.getItem('interactions');
    const localInteractions: StoredInteractions = localInteractionsStr
      ? JSON.parse(localInteractionsStr)
      : {};

    const interaction = localInteractions[type]?.find((i) => i.id === data.id);
    if (interaction) {
      setLikeActive(interaction.liked);
      setDislikeActive(interaction.disliked);
    }
  }, [data.id, type]);

  const onThumbClick = (thumbType: 'up' | 'down') => {
    // If the thumb is already active, reset the state
    if (thumbType === 'up') {
      if (likeActive) {
        setLikes((prev) => (prev > 0 ? prev - 1 : 0)); // Decrement likes only if it was previously liked
        setLikeActive(false); // Reset like active state
      } else {
        setLikes((prev) => prev + 1); // Increment likes
        setLikeActive(true);
        if (dislikeActive) {
          setDislikes((prev) => prev - 1); // Decrement dislikes if it was previously disliked
          setDislikeActive(false); // Reset dislike active state
        }
      }
    } else if (thumbType === 'down') {
      if (dislikeActive) {
        setDislikes((prev) => (prev > 0 ? prev - 1 : 0));
        setDislikeActive(false); // Reset dislike active state
      } else {
        setDislikes((prev) => prev + 1);
        setDislikeActive(true);
        if (likeActive) {
          setLikes((prev) => prev - 1); // Decrement likes if it was previously liked
          setLikeActive(false); // Reset like active state
        }
      }
    }

    debouncedUpdateLocalStorage({
      id: data.id,
      liked: thumbType === 'up',
      disliked: thumbType === 'down',
    });
  };

  // Simplify the thumb rendering function
  const renderThumb = (
    thumbType: 'up' | 'down',
    isActive: boolean,
    IconFilled: typeof ThumbUpIcon | typeof ThumbDownIcon,
    IconOutlined: typeof ThumbUpOutlinedIcon | typeof ThumbDownOutlinedIcon
  ) => {
    const onClick = () => {
      onThumbClick(thumbType);
    };

    return (
      <IconButton onClick={onClick} sx={thumbStyle}>
        {isActive ? <IconFilled color="primary" /> : <IconOutlined />}
      </IconButton>
    );
  };

  return (
    <>
      <Typography sx={{ mr: 2 }}>
        {renderThumb('up', likeActive, ThumbUpIcon, ThumbUpOutlinedIcon)}
        {likes}
      </Typography>
      <Typography sx={{ mr: 2 }}>
        {renderThumb(
          'down',
          dislikeActive,
          ThumbDownIcon,
          ThumbDownOutlinedIcon
        )}
        {dislikes}
      </Typography>
    </>
  );
};

export default LikeDislike;