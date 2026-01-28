import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  const selectRole = (role: "student" | "admin") => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="role-container">
      <div className="card role-card">
        <h2>Select Account Type</h2>
        <p className="meta">Choose how you want to continue</p>

        <div className="role-grid">
          <div
            className="role-option"
            onClick={() => selectRole("student")}
          >
            <div className="role-icon">🎓</div>
            <div className="role-title">Hostel Student</div>
            <div className="role-desc">
              Report hostel issues and track their resolution status.
            </div>
          </div>

          <div
            className="role-option"
            onClick={() => selectRole("admin")}
          >
            <div className="role-icon">🛠️</div>
            <div className="role-title">Management Staff</div>
            <div className="role-desc">
              Manage, review, and resolve reported hostel issues.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}