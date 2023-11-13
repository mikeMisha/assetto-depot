import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import type { dataCategory } from '../types/global';
interface DownloadBtnProps {
  link: string;
  dataCategory: dataCategory;
  typeId: string;
  downloads: number;
}

const DownloadBtn = (props: DownloadBtnProps) => {
  const { link, dataCategory, typeId, downloads } = props;
  const onClick = async () => {
    await axios.post('/api/download', {
      downloads: downloads + 1,
      dataCategory,
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
