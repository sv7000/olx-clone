// src/components/Auth/Register.jsx
import { useState } from 'react';
import axiosInstance from '../../axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/register', { username, email, password });
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="mt-28 flex items-center justify-center ">
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Gradient Side */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">Join Us!</div>
        </div>
        {/* Form Side */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
