// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // أيقونات من lucide-react

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-slate-200 text-black rounded-md shadow-lg px-4 sm:px-8 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <span className="text-2xl font-bold tracking-widest uppercase">
          Norr Gallery
        </span>
      </Link>

      {/* Hamburger Menu (Mobile) */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Links */}
      <div className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-slate-200 sm:bg-transparent shadow-md sm:shadow-none z-40 rounded-md sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0 py-4 sm:py-0 ${menuOpen ? 'block' : 'hidden'} sm:block transition-all duration-300`}>
        {!user ? (
          <Link
            to="/login"
            className="block text-center text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Login
          </Link>
        ) : (
          <>
            <button
              onClick={() => {
                navigate(`/user/${localStorage.getItem('id')}`);
                setMenuOpen(false);
              }}
              className="block text-center text-sm font-medium hover:underline w-full"
            >
              {localStorage.getItem("name") || "Profile"}
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-center text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition w-full"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
