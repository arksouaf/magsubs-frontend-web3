import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import {subscribe} from '../services/MagazinesSubsService'

const SubscribeToMagazine = ({contract,walletaddress, magazineId, refreshList }) => {
  const handleSubscribe = async () => {
    try {
      await subscribe(contract,walletaddress,magazineId);
      alert('Subscribed to magazine successfully');
      refreshList(); // Refresh the list after subscription
    } catch (error) {
      console.error('Error subscribing to magazine:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleSubscribe} variant="outlined" color="primary">Subscribe</Button>
    </div>
  );
};

export default SubscribeToMagazine;
