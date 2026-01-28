import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  const chooseRole = (role: "student" | "admin") => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Select Account Type</h2>
        <p className="meta">Choose how you want to continue</p>

        <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          <button onClick={() => chooseRole("student")}>
            Hostel Student
          </button>

          <button onClick={() => chooseRole("admin")}>
            Management Staff
          </button>
        </div>
      </div>
    </div>
  );
}