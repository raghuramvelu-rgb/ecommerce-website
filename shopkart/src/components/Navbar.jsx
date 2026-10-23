import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems } from "../redux/cartSlice";
import { selectFavorites } from "../redux/favoritesSlice";
import { signOut } from "../redux/authSlice";

export default function Navbar() {
  const total = useSelector(selectTotalItems);
  const favorites = useSelector(selectFavorites);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : "/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">S</span>ShopKart
        </Link>

        <form className="search" onSubmit={onSearch}>
          <input
            placeholder="Search products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        <nav className="nav-links">
          <NavLink to="/" end>Products</NavLink>
          <NavLink to="/favorites" className="cart-link">
            Favorites <span className="badge">{favorites.length}</span>
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart <span className="badge">{total}</span>
          </NavLink>
          {email ? (
            <button className="nav-account" onClick={() => dispatch(signOut())}>
              Sign out
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}