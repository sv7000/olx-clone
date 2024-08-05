import { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('unsold'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('status', status); 
    if (image) formData.append('image', image);

    try {
      await axiosInstance.post('/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setName('');
      setPrice('');
      setImage(null);
      setStatus('unsold'); 
      navigate('/'); 
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-32 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Sell Item</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="unsold">Unsold</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
