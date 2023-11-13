import React from 'react';
import { Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import useLikeDislike, { LikeDislikeProps } from '../hooks/useLikeDislike'; // Adjust the import path as necessary
import type { DataCategory } from '../types/global';

interface LikeDislikeComponentProps {
  data: LikeDislikeProps;
  dataCategory: DataCategory;
}

const thumbStyle = {
  mr: 0.5,
  '&:hover': { color: 'primary.main', cursor: 'pointer' },
};

const LikeDislike = (props: LikeDislikeComponentProps) => {
  const { data, dataCategory } = props;
  const { likes, dislikes, likeActive, dislikeActive, handleInteraction } =
    useLikeDislike(data, dataCategory);

  return (
    <>
      <Typography sx={{ mr: 2 }}>
        <IconButton onClick={() => handleInteraction('like')} sx={thumbStyle}>
          {likeActive ? (
            <ThumbUpIcon color="primary" />
          ) : (
            <ThumbUpOutlinedIcon />
          )}
        </IconButton>
        {likes}
      </Typography>
      <Typography sx={{ mr: 2 }}>
        <IconButton
          onClick={() => handleInteraction('dislike')}
          sx={thumbStyle}
        >
          {dislikeActive ? (
            <ThumbDownIcon color="primary" />
          ) : (
            <ThumbDownOutlinedIcon />
          )}
        </IconButton>
        {dislikes}
      </Typography>
    </>
  );
};

export default LikeDislike;
