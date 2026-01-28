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
    <div className="header">
      <h2>Student Dashboard</h2>
      <p className="meta">Report and track hostel issues</p>
    </div>

    <div className="card">
      <div className="card-title">Raise a Complaint</div>

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

    <div className="card">
      <div className="card-title">My Complaints</div>

      {issues.length === 0 && (
        <p className="meta">No complaints submitted yet.</p>
      )}

      {issues.map((issue) => (
        <div key={issue._id} style={{ marginBottom: "12px" }}>
          <strong>{issue.title}</strong>
          <p className="meta">{issue.description}</p>
          <span className={`badge ${issue.status}`}>
            {issue.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);
}