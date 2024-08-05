import { useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div 
          className="text-2xl font-bold cursor-pointer hover:opacity-80"
          onClick={handleLogoClick}
        >
          OLX Clone
        </div>
        <div className="space-x-4">
          {!token ? (
            <>
              <a href="/login" className="hover:text-yellow-300 transition-colors duration-300">Login</a>
              <a href="/register" className="hover:text-yellow-300 transition-colors duration-300">Register</a>
            </>
          ) : (
            <>
              <a href="/sell" className="hover:text-yellow-300 transition-colors duration-300">Sell Item</a>
              <a href="/my-items" className="hover:text-yellow-300 transition-colors duration-300">My Items</a>
              <a href="/my-purchases" className="hover:text-yellow-300 transition-colors duration-300">My Purchases</a>
              <button 
                onClick={handleLogout} 
                className="bg-transparent border-0 text-white hover:text-yellow-300 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

