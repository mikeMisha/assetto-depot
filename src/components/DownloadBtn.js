import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const DownloadBtn = ({ link, type, typeId, downloads }) => {
  const onClick = async () => {
    await axios.post('/api/download', {
      downloads: downloads + 1,
      type,
      typeId,
    });
  };
  return (
    <Button onClick={onClick} variant="contained" href={link}>
      Download
    </Button>
  );
};

export default DownloadBtn;
