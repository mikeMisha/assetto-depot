import React, { useState, useEffect, useMemo } from 'react';
import { Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import axios from 'axios';
import _ from 'lodash';

const sx = {
  mr: 0.5,
  '&:hover': { color: 'primary.main', cursor: 'pointer' },
};
const LikeDislike = ({ data, type }) => {
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [interactionClicked, setInteractionClicked] = useState(false);
  const [interactions, setInteractions] = useState({
    likes: data.likes,
    dislikes: data.dislikes,
    type: type,
    typeId: data.id,
  });

  const debounceFn = useMemo(
    () => _.debounce(handleDebounceFn, 1000),
    [likeActive, dislikeActive]
  );

  useEffect(() => {
    const localInteractions = JSON.parse(localStorage.getItem('interactions'));
    if (localInteractions && localInteractions[type]) {
      const intIndex = localInteractions[type].findIndex(
        (obj) => obj.id === data.id
      );
      if (intIndex !== -1) {
        setLikeActive(localInteractions[type][intIndex].liked);
        setDislikeActive(localInteractions[type][intIndex].disliked);
      }
    }
  }, []);

  useEffect(() => {
    if (interactionClicked) {
      if (likeActive) {
        setInteractions((prevInt) => {
          return { ...prevInt, likes: prevInt.likes + 1 };
        });
      } else {
        setInteractions((prevInt) => {
          return { ...prevInt, likes: prevInt.likes - 1 };
        });
      }
    }
  }, [likeActive]);

  useEffect(() => {
    if (interactionClicked) {
      if (dislikeActive) {
        setInteractions((prevInt) => {
          return { ...prevInt, dislikes: prevInt.dislikes + 1 };
        });
      } else {
        setInteractions((prevInt) => {
          return { ...prevInt, dislikes: prevInt.dislikes - 1 };
        });
      }
    }
  }, [dislikeActive]);

  useEffect(() => {
    if (interactionClicked) {
      debounceFn(interactions);
    }
  }, [interactions]);

  const updateLocalStorage = (data) => {
    å;
    const { typeId } = data;
    const interactions = JSON.parse(localStorage.getItem('interactions'));
    const item = [{ id: typeId, liked: likeActive, disliked: dislikeActive }];
    if (!interactions) {
      localStorage.setItem(
        'interactions',
        JSON.stringify({
          [type]: item,
        })
      );
    } else if (!interactions.hasOwnProperty(type)) {
      localStorage.setItem(
        'interactions',
        JSON.stringify({
          ...interactions,
          [type]: item,
        })
      );
    } else {
      const typeArr = interactions[type];
      const updatedArr = typeArr.map(
        (obj) => item.find((o) => o.id === obj.id) || obj
      );
      localStorage.setItem(
        'interactions',
        JSON.stringify({ ...interactions, [type]: updatedArr })
      );
    }
  };

  function handleDebounceFn(interactionsData) {
    updateLocalStorage(interactionsData);
    axios.post('/api/interaction', interactionsData).catch((err) => {
      if (err.response.status === 404) {
        console.log('Resource could not be found!');
      } else {
        console.log(err.message);
      }
    });
  }

  const renderThumb = (thumb, FillThumb, OutlineThumb, clicked) => {
    const onClick = () => {
      setInteractionClicked(true);
      if (thumb === 'up') {
        setLikeActive(!likeActive);
        setDislikeActive(false);
      } else if (thumb == 'down') {
        setDislikeActive(!dislikeActive);
        setLikeActive(false);
      }
    };
    return clicked ? (
      <IconButton onClick={onClick}>
        <FillThumb color="primary" sx={sx} />
      </IconButton>
    ) : (
      <IconButton onClick={onClick}>
        <OutlineThumb sx={sx} />
      </IconButton>
    );
  };

  return (
    <>
      <Typography variant="icon" sx={{ mr: 2 }}>
        {renderThumb('up', ThumbUpIcon, ThumbUpOutlinedIcon, likeActive)}
        {interactions.likes}
      </Typography>
      <Typography variant="icon" sx={{ mr: 2 }}>
        {renderThumb(
          'down',
          ThumbDownIcon,
          ThumbDownOutlinedIcon,
          dislikeActive
        )}
        {interactions.dislikes}
      </Typography>
    </>
  );
};

export default LikeDislike;
