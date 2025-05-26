// File: client/src/pages/MyProduce.jsx
export default function MyProduce() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Produce Listings</h2>
      <p>Coming soon: Add, edit, and delete your produce listings.</p>
    </div>
  );
}



import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyProduce() {
  const [form, setForm] = useState({ name: '', quantity: '', price: '', location: '' });
  const [produce, setProduce] = useState([]);

  const userId = 'demo-user-id'; // Replace with real user ID from auth

  const fetchProduce = async () => {
    const res = await axios.get(`http://localhost:5000/api/produce/user/${userId}`);
    setProduce(res.data);
  };

  useEffect(() => { fetchProduce(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/produce', { ...form, userId });
    setForm({ name: '', quantity: '', price: '', location: '' });
    fetchProduce();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Produce</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2" />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="border p-2" />
        <button className="bg-green-600 text-white py-2">Add Listing</button>
      </form>

      <div>
        {produce.map((item, i) => (
          <div key={i} className="border p-3 mb-2">
            <strong>{item.name}</strong> - {item.quantity} units @ ₦{item.price} in {item.location}
          </div>
        ))}
      </div>
    </div>
  );
}



import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function BuyProduce() {
  const { user } = useContext(AuthContext);
  const [produceName, setProduceName] = useState('');
  const [matches, setMatches] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/match/search', { produceName }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMatches(res.data);
    } catch (err) {
      alert('Search failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Search for Produce</h2>
      <input
        type="text"
        placeholder="e.g., Tomatoes"
        value={produceName}
        onChange={(e) => setProduceName(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white py-2 px-4 rounded">Search</button>

      <div className="mt-6">
        {matches.map((match, idx) => (
          <div key={idx} className="border rounded p-4 mb-2">
            <p><strong>Produce:</strong> {match.name}</p>
            <p><strong>Price:</strong> {match.price}</p>
            <p><strong>Quantity:</strong> {match.quantity}</p>
            <p><strong>Seller:</strong> {match.sellerId.name}</p>
            <p><strong>Email:</strong> {match.sellerId.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
