import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increase, decrease, selectQtyById } from "../redux/cartSlice";
import { selectIsFavorite, toggleFavorite } from "../redux/favoritesSlice";

export const Rating = ({ rating }) => (
  <div className="rating">
    <span className="star">★</span>
    <b>{rating.rate}</b>
    <span className="muted">({rating.count} reviews)</span>
  </div>
);

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const qty = useSelector(selectQtyById(product.id));
  const isFavorite = useSelector(selectIsFavorite(product.id));

  return (
    <article className="card product-card">
      <button
        className={`favorite-toggle ${isFavorite ? "selected" : ""}`}
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => dispatch(toggleFavorite(product))}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product.id}`} className="card-img">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title">
          {product.title}
        </Link>
        <Rating rating={product.rating} />
        <div className="card-foot">
          <span className="price">${product.price.toFixed(2)}</span>
          {qty === 0 ? (
            <button className="btn" onClick={() => dispatch(addToCart({ product }))}>
              Add to cart
            </button>
          ) : (
            <div className="stepper">
              <button onClick={() => dispatch(decrease(product.id))}>−</button>
              <span>{qty}</span>
              <button onClick={() => dispatch(increase(product.id))}>+</button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}