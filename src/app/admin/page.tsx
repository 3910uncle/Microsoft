import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AdminPage() {
  // Verify authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession || adminSession.value !== "authenticated") {
    redirect("/admin/login");
  }

  // Fetch all submissions from database
  const submissions = await db
    .select()
    .from(formSubmissions)
    .orderBy(desc(formSubmissions.submittedAt));

  async function deleteSubmission(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await db.delete(formSubmissions).where(eq(formSubmissions.id, parseInt(id)));
      revalidatePath("/admin");
    }
  }

  async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "40px", 
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: 0 }}>Form Submissions Admin</h1>
        <form action={logout}>
          <button 
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Logout
          </button>
        </form>
      </div>
      
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
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Actions</th>
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
                <td style={{ padding: "12px" }}>
                  <form action={deleteSubmission}>
                    <input type="hidden" name="id" value={submission.id} />
                    <button 
                      type="submit"
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                      onClick={(e) => {
                        if (!confirm("Are you sure you want to delete this submission?")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </form>
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
