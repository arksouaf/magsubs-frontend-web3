import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { updateMagazine } from '../services/MagazinesSubsService';

const UpdateMagazine = ({ contract, walletaddress, id, refreshList, handleCloseUpdatePopup }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMagazine(contract, walletaddress, id, name, price);
      alert('Magazine updated successfully');
      setName('');
      setPrice('');
      refreshList();
      handleCloseUpdatePopup();
    } catch (error) {
      console.error('Error updating magazine:', error);
    }
  };

  return (
    <Box sx={{ width: 400, margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Magazine
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          type="number"
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdateMagazine;
