import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchProducts } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import { selectIsFavorite, toggleFavorite } from "../redux/favoritesSlice";
import { Rating } from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected: p, selectedStatus, items, status } = useSelector((s) => s.products);
  const isFavorite = useSelector(selectIsFavorite(p?.id));
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
    setQty(1);
    setActive(0);
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (selectedStatus === "failed")
    return (
      <div className="state error">
        <p>Could not load this product.</p>
        <button className="btn" onClick={() => dispatch(fetchProductById(id))}>
          Try again
        </button>
      </div>
    );
  if (!p || String(p.id) !== id) return <p className="state">Loading products...</p>;

  const thumbs = [p.image, p.image, p.image]; // API returns one image
  const related = items.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <section>
      <nav className="crumbs">
        <Link to="/">Products</Link> / <span>{label(p.category)}</span> /{" "}
        <span>{p.title}</span>
      </nav>

      <div className="pdp card">
        <div className="gallery">
          <div className="thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={i === active ? "active" : ""}
                onClick={() => setActive(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="main-img">
            <img src={thumbs[active]} alt={p.title} />
          </div>
        </div>

        <div className="info">
          <span className="category">{p.category}</span>
          <h1>{p.title}</h1>
          <Rating rating={p.rating} />
          <div className="price big">${p.price.toFixed(2)}</div>
          <p className="muted desc">{p.description}</p>

          <div className="qty-row">
            <span>Quantity</span>
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="actions">
            <button
              className="btn lg"
              onClick={() => dispatch(addToCart({ product: p, quantity: qty }))}
            >
              Add to cart
            </button>
            <button
              className="btn lg outline"
              onClick={() => dispatch(toggleFavorite(p))}
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
            <button className="btn lg outline" onClick={() => navigate("/cart")}>
              Go to cart
            </button>
          </div>

          <ul className="perks">
            <li>Free shipping on orders of $100 or more</li>
            <li>30-day easy returns</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h2 className="section-title">You may also like</h2>
          <div className="grid">
            {related.map((r) => (
              <Link to={`/product/${r.id}`} key={r.id} className="card mini">
                <div className="card-img">
                  <img src={r.image} alt={r.title} />
                </div>
                <span className="card-title">{r.title}</span>
                <span className="price">${r.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function label(c) {
  return c[0].toUpperCase() + c.slice(1);
}