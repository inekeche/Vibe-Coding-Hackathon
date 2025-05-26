// File: client/src/pages/MarketMatch.jsx
export default function MarketMatch() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Market Match</h2>
      <p>Coming soon: Alerts and matching with nearby buyers.</p>
    </div>
  );
}

import { useState } from 'react';
import axios from 'axios';

export default function MarketMatch() {
  const [produce, setProduce] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/prices/alerts', {
      userId: 'demo-user-id', // replace with real user from auth
      produce,
      priceThreshold: parseFloat(price),
    });
    alert('Price alert set!');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Set Price Alert</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Produce (e.g., Maize)"
          value={produce}
          onChange={(e) => setProduce(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Alert if price is above..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-green-700 text-white py-2 rounded">
          Set Alert
        </button>
      </form>
    </div>
  );
}


const [location, setLocation] = useState('');

await axios.post('http://localhost:5000/api/prices/alerts', {
  userId: 'demo-user-id',
  produce,
  priceThreshold: parseFloat(price),
  location
});


<input
  type="text"
  placeholder="Location (optional)"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="border p-2 rounded"
/>



import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function MarketMatch() {
  const { user } = useContext(AuthContext);
  const [produce, setProduce] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/prices/alerts', {
        produce,
        priceThreshold: parseFloat(price),
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      alert('Price alert set!');
    } catch (err) {
      alert('Failed to set alert');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Set Price Alert</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Produce (e.g., Maize)" value={produce} onChange={(e) => setProduce(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Alert if price is above..." value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded" />
        <button className="bg-green-700 text-white py-2 rounded">Set Alert</button>
      </form>
    </div>
  );
}


