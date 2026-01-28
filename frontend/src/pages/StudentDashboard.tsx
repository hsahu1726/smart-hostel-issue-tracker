import { useEffect, useState } from "react";
import api from "../api/api";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
}

export default function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchMyIssues = async () => {
    try {
      const res = await api.get("/issues/my");
      setIssues(res.data);
    } catch (err) {
      alert("Failed to load issues");
    }
  };

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/issues", {
        title,
        description,
        category: "other",
      });

      setTitle("");
      setDescription("");
      fetchMyIssues();
    } catch (err) {
      alert("Failed to create issue");
    }
  };

  return (
  <div className="container">
    {/* Header */}
    <div className="dashboard-header">
      <h1>Student Dashboard</h1>
      <p>Report issues and track their resolution in real time</p>
    </div>

    {/* Raise Complaint */}
    <div className="card action-card">
      <div className="section-title">Raise a Complaint</div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe the issue in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit Issue</button>
      </form>
    </div>

    {/* Complaints List */}
    <div className="card">
      <div className="section-title">My Complaints</div>

      {issues.length === 0 ? (
        <div className="empty-state">
          <span>📭</span>
          <p>No complaints submitted yet</p>
          <p style={{ fontSize: "13px" }}>
            Your reported issues will appear here
          </p>
        </div>
      ) : (
        issues.map((issue) => (
          <div key={issue._id} style={{ marginBottom: "14px" }}>
            <strong>{issue.title}</strong>
            <p className="meta">{issue.description}</p>
            <span className={`badge ${issue.status}`}>
              {issue.status}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);
}