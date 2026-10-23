import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/authSlice";

export default function Login() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");

  if (email) return <Navigate to="/" replace />;

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn(formEmail.trim()));
    navigate("/", { replace: true });
  };

  return (
    <section className="login-page">
      <form className="card login-card" onSubmit={onSubmit}>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to your ShopKart account.</p>
        <label className="login-field">
          Email
          <input
            type="email"
            autoComplete="email"
            value={formEmail}
            onChange={(event) => setFormEmail(event.target.value)}
            required
          />
        </label>
        <label className="login-field">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="btn lg" type="submit">Sign in</button>
        
        <Link to="/" className="link login-back">Continue browsing</Link>
      </form>
    </section>
  );
}