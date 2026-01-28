import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const role = localStorage.getItem("selectedRole");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      navigate("/");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      navigate(role === "admin" ? "/admin" : "/student");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-hostel">
      <div className="container">
        <div className="card auth-card">
          <h2>Login</h2>
          <p className="auth-sub">
            Logging in as <strong>{role}</strong>
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

          <p className="auth-link meta">
            New user?{" "}
            <span
              style={{ color: "#2563eb", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}