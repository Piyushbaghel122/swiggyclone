import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Food<span>Cut</span>
        </Link>
        
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for restaurants or food..." 
            className="search-input"
          />
        </div>

        <div className="navbar-links">
          <Link to="/login" className="nav-btn nav-btn-outline">
            Login
          </Link>
          <Link to="/signup" className="nav-btn nav-btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}