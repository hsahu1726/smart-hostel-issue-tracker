import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
}

export default function AdminDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchIssues = async () => {
    const res = await api.get("/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/issues/${id}`, { status });
    fetchIssues();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage and resolve reported hostel issues</p>
        </div>

        {/* Issues */}
        <div className="card">
          <div className="section-title">All Reported Issues</div>

          {issues.length === 0 ? (
            <div className="empty-state">
              <span>🛠️</span>
              <p>No issues reported yet</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue._id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{issue.title}</strong>
                  <span className={`badge ${issue.status}`}>
                    {issue.status}
                  </span>
                </div>

                <p className="meta">{issue.description}</p>

                <select
                  value={issue.status}
                  onChange={(e) =>
                    updateStatus(issue._id, e.target.value)
                  }
                  style={{ marginTop: "8px" }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
