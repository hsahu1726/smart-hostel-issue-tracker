import { useEffect, useState } from "react";
import api from "../api/api";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  createdBy?: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchAllIssues = async () => {
    try {
      const res = await api.get("/issues");
      setIssues(res.data);
    } catch (err) {
      alert("Failed to load issues");
    }
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/issues/${id}`, { status });
      fetchAllIssues();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
  <div className="container">
    <div className="header">
      <h2>Admin Dashboard</h2>
      <p className="meta">Manage and resolve student complaints</p>
    </div>

    {issues.length === 0 && (
      <div className="card">
        <p className="meta">No complaints found.</p>
      </div>
    )}

    {issues.map((issue) => (
      <div className="card" key={issue._id}>
        <strong>{issue.title}</strong>
        <p className="meta">{issue.description}</p>

        {issue.createdBy && (
          <p className="meta">
            Student: {issue.createdBy.name} ({issue.createdBy.email})
          </p>
        )}

        <div style={{ marginTop: "10px" }}>
          <span className={`badge ${issue.status}`}>
            {issue.status}
          </span>
        </div>

        <div style={{ marginTop: "12px" }}>
          <select
            value={issue.status}
            onChange={(e) =>
              updateStatus(issue._id, e.target.value)
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    ))}
  </div>
);
}