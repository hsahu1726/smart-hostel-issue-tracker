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
      alert("Please select role first");
      navigate("/");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      navigate(role === "admin" ? "/admin" : "/student");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "450px", margin: "100px auto" }}>
        <h2>Login</h2>
        <p className="meta">
          Logging in as <strong>{role}</strong>
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
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

        <p className="meta" style={{ marginTop: "16px" }}>
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
  );
}