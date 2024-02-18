import React from 'react';
import axios from 'axios';

const DeleteMagazine = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://ytxviewer-001-site6.itempurl.com/magazines/${id}`);
      alert('Magazine deleted successfully');
    } catch (error) {
      console.error('Error deleting magazine:', error);
    }
  };

  return (
    <div>
      <h2>Delete Magazine</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteMagazine;

