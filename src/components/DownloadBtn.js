import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const DownloadBtn = ({ link, type, typeId, downloads }) => {
  const onClick = async () => {
    await axios
      .post('/api/download', { downloads: downloads + 1, type, typeId })
      .then((res) => {
        console.log(res.data);
      });
    window.open(link, '_blank');
  };
  return (
    <Button onClick={onClick} variant="contained">
      Download
    </Button>
  );
};

export default DownloadBtn;
