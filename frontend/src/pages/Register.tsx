import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const role = localStorage.getItem("selectedRole");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      navigate("/");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-hostel">
      <div className="container">
        <div className="card auth-card">
          <h2>Create Account</h2>
          <p className="auth-sub">
            Registering as <strong>{role}</strong>
          </p>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}