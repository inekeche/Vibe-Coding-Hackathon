// === FRONTEND ===
// File: client/src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/produce')
      .then((res) => setProduce(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Available Produce</h1>
      <ul className="mt-4">
        {produce.map((item) => (
          <li key={item._id}>{item.cropName} - ${item.price}/kg</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
