import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
const label = (c) => c[0].toUpperCase() + c.slice(1);

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const visible = useMemo(() => {
    let list = items.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.title.toLowerCase().includes(q)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [items, category, sort, q]);

  return (
    <section>
      <div className="head-row">
        <div>
          <h1>All products</h1>
          <p className="muted">Showing {visible.length} products</p>
        </div>
        <label className="sort">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>

      <div className="chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {label(c)}
          </button>
        ))}
      </div>

      {status === "loading" && <p className="state">Loading products...</p>}
      {status === "failed" && (
        <div className="state error">
          <p>{error || "Something went wrong."}</p>
          <button className="btn" onClick={() => dispatch(fetchProducts())}>
            Try again
          </button>
        </div>
      )}
      {status === "succeeded" && (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}