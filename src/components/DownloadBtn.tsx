import { Button, Modal, Typography, Box, Stack } from '@mui/material';
import axios from 'axios';
import type { DataCategory } from '../types/global';
import { useState } from 'react';

interface DownloadBtnProps {
  link: string;
  dataCategory: DataCategory;
  typeId: string;
  downloads: number;
}

const DownloadBtn = (props: DownloadBtnProps) => {
  const { link, dataCategory, typeId, downloads } = props;
  const [openModal, setOpenModal] = useState(false);

  const onClick = async () => {
    setOpenModal(true);
  };

  const onDownload = async () => {
    setOpenModal(false);
    await axios.post('/api/download', {
      downloads: downloads + 1,
      dataCategory,
      typeId,
    });
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Button onClick={onClick} variant="contained">
        Download
      </Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Download Warning:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are about to be redirected to an external download link. Please
            be aware that while we strive to provide safe and reliable links, we
            cannot guarantee the security of third-party sites.
          </Typography>
          <Typography sx={{ mt: 2 }}>Proceed at your own risk.</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          >
            <Button variant="contained" onClick={handleClose}>
              go back
            </Button>
            <Button
              onClick={onDownload}
              color="error"
              variant="contained"
              href={link}
              target="_blank"
            >
              Download
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default DownloadBtn;
