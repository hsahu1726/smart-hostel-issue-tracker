import { useNavigate } from "react-router-dom";

import studentImg from "../assets/student.jpg";
import staffImg from "../assets/staff.jpg";

export default function SelectRole() {
  const navigate = useNavigate();

  const selectRole = (role: "student" | "admin") => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="bg-hostel role-container">
      <div className="card role-card" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
          Welcome to <span style={{ color: "#2563eb" }}>THE HOSTEL</span>
        </h1>

        <p className="meta" style={{ fontSize: "16px" }}>
          Choose how you want to continue
        </p>

        <div className="role-grid">
          {/* STUDENT CARD */}
          <div
            className="role-option"
            onClick={() => selectRole("student")}
          >
            <div className="role-image-wrapper">
              <img
                src={studentImg}
                alt="Hostel Student"
                className="role-image"
              />
            </div>

            <div className="role-title">Hostel Student</div>
            <div className="role-desc">
              Report hostel issues and track their resolution status.
            </div>
          </div>

          {/* STAFF CARD */}
          <div
            className="role-option"
            onClick={() => selectRole("admin")}
          >
            <div className="role-image-wrapper">
              <img
                src={staffImg}
                alt="Management Staff"
                className="role-image"
              />
            </div>

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