import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { selectFavorites, toggleFavorite } from "../redux/favoritesSlice";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  if (favorites.length === 0) {
    return (
      <section>
        <h1>Your favorites (0)</h1>
        <div className="card empty">
          <h2>No favorites yet</h2>
          <p className="muted">
            Save products you like and they will be waiting here.
          </p>
          <Link to="/" className="btn lg inline">Browse products</Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="head-row">
        <div>
          <h1>Your favorites ({favorites.length})</h1>
          <p className="muted">Products you have saved for later</p>
        </div>
        <button
          className="link-btn"
          onClick={() => favorites.forEach((product) => dispatch(toggleFavorite(product)))}
        >
          Clear favorites
        </button>
      </div>
      <div className="grid">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}