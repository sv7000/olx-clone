import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null); 

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await axiosInstance.get('/items/my-items');
        setItems(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoadingId(id); // Set loading state for the item being deleted
      try {
        await axiosInstance.delete(`/items/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoadingId(null); // Reset loading state
      }
    }
  };

  const placeholderImage = 'https://via.placeholder.com/300x200.png?text=No+Image';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">My Items</h2>
      {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(item => (
          <div
            key={item._id}
            className={`relative border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl ${loadingId === item._id ? 'opacity-50' : ''}`}
          >
            <img
              src={item.image === 0 ? `/uploads/${item.image}` : placeholderImage}
              alt={item.name}
              className={`w-full h-56 object-cover transition-opacity duration-300 ${loadingId === item._id ? 'opacity-50' : 'hover:opacity-75'}`}
            />
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 transition-colors duration-300 hover:text-blue-600">{item.name}</h3>
              <p className="text-gray-700 text-lg mb-2">Price: ₹ {item.price} /-</p>
              <p className={`text-sm font-medium ${item.status === 'sold' ? 'text-red-600' : 'text-green-600'}`}>
                Status: {item.status}
              </p>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors duration-300"
                disabled={loadingId === item._id} // Disable button while loading
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyItems;
