import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import {addMagazine} from '../services/MagazinesSubsService'

const CreateMagazine = ({ contract,walletaddress, refreshList }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMagazine(contract,walletaddress,name,price);
      alert('Magazine created successfully');
      setName('');
      setPrice('');
      // Call refreshList to update the list of magazines after creating a new one
      refreshList();
    } catch (error) {
      console.error('Error creating magazine:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Create Magazine</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateMagazine;
