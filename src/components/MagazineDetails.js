import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MagazineDetails = ({ id }) => {
  const [magazine, setMagazine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const response = await axios.get(`http://ytxviewer-001-site6.itempurl.com/magazines/${id}`);
        setMagazine(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMagazine();
  }, [id]);

  return (
    <div>
      <h2>Magazine Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Name: {magazine.name}</p>
          <p>Price: {magazine.price}</p>
        </div>
      )}
    </div>
  );
};

export default MagazineDetails;
