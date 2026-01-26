import { useEffect, useState } from "react";
import api from "../api/api";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchAllIssues = async () => {
    const res = await api.get("/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/issues/${id}`, { status });
    fetchAllIssues();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {issues.map((issue) => (
        <div key={issue._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{issue.title}</h4>
          <p>{issue.description}</p>
          <p>
            <strong>Status:</strong> {issue.status}
          </p>

          {issue.createdBy && (
            <p>
              <strong>Student:</strong> {issue.createdBy.name} ({issue.createdBy.email})
            </p>
          )}

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