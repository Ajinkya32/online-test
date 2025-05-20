import { useEffect, useState } from "react";
import { fetchScores } from "../services/api";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchScores().then((res) => setResults(res.data));
  }, []);

  return (
    <div className="wrapper">
      <div className="header">Online Test Results</div>

      <div className="content">
        <div className="card">
          <h2>All Candidates</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Score</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.userId}>
                  <td>{r.userId}</td>
                  <td>{r.score}</td>
                  <td>{new Date(r.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
