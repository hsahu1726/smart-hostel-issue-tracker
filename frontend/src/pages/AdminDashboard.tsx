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
      <h2>Admin Dashboard</h2>

      {issues.length === 0 && <p>No issues found.</p>}

      {issues.map((issue) => (
        <div className="card" key={issue._id}>
          <h4>{issue.title}</h4>
          <p>{issue.description}</p>

          {issue.createdBy && (
            <p>
              <strong>Student:</strong>{" "}
              {issue.createdBy.name} ({issue.createdBy.email})
            </p>
          )}

          <p className={`status ${issue.status}`}>
            Status: {issue.status}
          </p>

          <select
            value={issue.status}
            onChange={(e) => updateStatus(issue._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}