import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      borderBottom: "1px solid #e5e7eb",
      background: "white",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <strong>Smart Hostel Issue Tracker</strong>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          {role?.toUpperCase()}
        </span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
