import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

interface DownloadBtnProps {
  link: string;
  type: string;
  typeId: string;
  downloads: number;
}

const DownloadBtn = (props: DownloadBtnProps) => {
  const { link, type, typeId, downloads } = props;
  const onClick = async () => {
    await axios.post('/api/download', {
      downloads: downloads + 1,
      type,
      typeId,
    });
  };
  return (
    <Button onClick={onClick} variant="contained" href={link} target="_blank">
      Download
    </Button>
  );
};

export default DownloadBtn;
