import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import {unsubscribe} from '../services/MagazinesSubsService'

const CancelSubscription = ({ contract,walletaddress, magazineId, refreshList }) => {
  const handleCancel = async () => {
    try {
      await unsubscribe(contract,walletaddress,magazineId);
      alert('Subscription canceled successfully');
      refreshList(); // Refresh the list after canceling subscription
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleCancel} variant="outlined" color="warning">Cancel Subscription</Button>
    </div>
  );
};

export default CancelSubscription;
