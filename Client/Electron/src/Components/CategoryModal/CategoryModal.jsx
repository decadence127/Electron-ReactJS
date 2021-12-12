import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  display: 'flex',
  flexFlow: 'column wrap',
  minHeight: '300px',
  minWidth: '400px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const CategoryModal = ({ open, setOpen, clickHandler, category, setCategory }) => {

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Введите данные
          </Typography>
          <TextField sx={{ marginTop: 3, marginBottom: 3 }} name="categoryTitle" onChange={e => setCategory({ ...category, [e.target.name]: e.target.value })} placeholder='Название' />
          <TextField sx={{ marginBottom: 3 }} name="taxPercentage" type="number" onChange={e => setCategory({ ...category, [e.target.name]: e.target.value })} placeholder='Процент сборов' />
          <Button onClick={async e => await clickHandler()}>Добавить</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryModal;