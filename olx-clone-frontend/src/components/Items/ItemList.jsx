import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/items');
        setItems(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchItems();
  }, []);

  const placeholderImage = 'https://via.placeholder.com/300x200.png?text=No+Image';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-500">Available Items</h2>
      {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(item => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item.image === 0 ? `/uploads/${item.image}` : placeholderImage}
              alt={item.name}
              className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-75"
            />
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-600">{item.name}</h3>
              <p className="text-gray-700 text-lg mb-2">Price: ₹ {item.price} /-</p>
              <p className={`text-sm font-medium ${item.status === 'sold' ? 'text-red-600' : 'text-green-600'}`}>
                Status: {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
