import { useEffect, useState } from "react";
import api from "../api/api";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export default function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchMyIssues = async () => {
    const res = await api.get("/issues/my");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/issues", {
      title,
      description,
      category: "other",
    });

    setTitle("");
    setDescription("");
    fetchMyIssues();
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>Create Issue</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Submit Issue</button>
      </form>

      <hr />

      <h3>My Issues</h3>
      {issues.map((issue) => (
        <div key={issue._id} style={{ marginBottom: "10px" }}>
          <strong>{issue.title}</strong>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
        </div>
      ))}
    </div>
  );
}