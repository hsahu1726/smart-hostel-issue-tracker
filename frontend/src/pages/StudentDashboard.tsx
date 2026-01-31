import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
}

export default function StudentDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchIssues = async () => {
    const res = await api.get("/issues/my");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/issues", { title, description });
    setTitle("");
    setDescription("");
    fetchIssues();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Report hostel issues and track their resolution</p>
        </div>

        {/* Raise Issue */}
        <div className="card action-card">
          <div className="section-title">Raise a Complaint</div>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Issue title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Describe the issue clearly"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button type="submit">Submit Issue</button>
          </form>
        </div>

        {/* Issues List */}
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
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
