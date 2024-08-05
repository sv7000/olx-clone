import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ItemForm from './components/Items/ItemForm';
import ItemList from './components/Items/ItemList';
import MyItems from './components/Items/MyItems';
import MyPurchases from './components/Items/MyPurchase';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      
      <Navbar token={token} setToken={setToken} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell" element={token ? <ItemForm /> : <Login setToken={setToken} />} />
          <Route path="/my-items" element={token ? <MyItems /> : <Login setToken={setToken} />} />
          <Route path="/my-purchases" element={token ? <MyPurchases /> : <Login setToken={setToken} />} />
        </Routes>
      </div>
    
    </Router>
  );
};

export default App;
