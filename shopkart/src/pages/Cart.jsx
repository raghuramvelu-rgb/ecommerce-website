import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems, selectTotalItems, selectTotalPrice,
  increase, decrease, removeFromCart, clearCart,
} from "../redux/cartSlice";

const FREE_AT = 100;
const SHIPPING = 5;

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectTotalItems);
  const subtotal = useSelector(selectTotalPrice);

  const shipping = subtotal >= FREE_AT ? 0 : SHIPPING;
  const total = subtotal + shipping;

  if (items.length === 0)
    return (
      <section>
        <h1>Your cart (0 items)</h1>
        <div className="card empty">
          <h2>Your cart is empty</h2>
          <p className="muted">
            Looks like you haven't added anything yet. Browse the products and
            add your favourites.
          </p>
          <Link to="/" className="btn lg inline">Browse products</Link>
        </div>
      </section>
    );

  return (
    <section>
      <div className="head-row">
        <h1>Your cart ({count} items)</h1>
        <Link to="/" className="link">Continue shopping</Link>
      </div>

      <div className="cart-layout">
        <div className="card cart-list">
          <div className="cart-head">
            <span>PRODUCT</span>
            <button className="link-btn" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </div>

          {items.map((i) => (
            <div className="cart-row" key={i.id}>
              <Link to={`/product/${i.id}`} className="cart-img">
                <img src={i.image} alt={i.title} />
              </Link>
              <div className="cart-info">
                <Link to={`/product/${i.id}`} className="card-title">{i.title}</Link>
                <span className="category">{i.category}</span>
                <span className="muted">${i.price.toFixed(2)} each</span>
                <button className="link-btn danger" onClick={() => dispatch(removeFromCart(i.id))}>
                  Remove
                </button>
              </div>
              <div className="stepper">
                <button onClick={() => dispatch(decrease(i.id))}>−</button>
                <span>{i.quantity}</span>
                <button onClick={() => dispatch(increase(i.id))}>+</button>
              </div>
              <b className="line-total">${(i.price * i.quantity).toFixed(2)}</b>
            </div>
          ))}
        </div>

        <aside className="card summary">
          <h2>Order summary</h2>
          <div className="line"><span>Items</span><span>{count}</span></div>
          <div className="line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="line">
            <span>Shipping</span>
            <span className={shipping === 0 ? "free" : ""}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="line total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="btn lg">Proceed to checkout</button>
          <p className="note">Cart is saved with redux-persist. Refresh and it stays.</p>
        </aside>
      </div>
    </section>
  );
}