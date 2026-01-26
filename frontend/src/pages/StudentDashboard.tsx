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
      <h2>Student Dashboard</h2>

      <div className="card">
        <h3>Create Issue</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe your issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Submit Issue</button>
        </form>
      </div>

      <h3>My Issues</h3>

      {issues.length === 0 && <p>No issues submitted yet.</p>}

      {issues.map((issue) => (
        <div className="card" key={issue._id}>
          <h4>{issue.title}</h4>
          <p>{issue.description}</p>
          <p className={`status ${issue.status}`}>
            Status: {issue.status}
          </p>
        </div>
      ))}
    </div>
  );
}