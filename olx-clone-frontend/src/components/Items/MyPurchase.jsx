// src/components/Items/MyPurchases.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyPurchases = async () => {
      try {
        const response = await axiosInstance.get('/items/my-purchases');
        setPurchases(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchMyPurchases();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Purchases</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {purchases.map(item => (
          <div key={item._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
            {item.image && <img src={`/uploads/${item.image}`} alt={item.name} className="w-full h-48 object-cover mb-2 rounded" />}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-700">Price: ${item.price}</p>
            <p className={`text-sm ${item.status === 'sold' ? 'text-red-500' : 'text-green-500'}`}>
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
