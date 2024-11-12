import { pool } from "@/lib/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userEmail } = params;

  try {
    const query = `SELECT * FROM results WHERE user_email = $1 ORDER BY created_at DESC`;
    const values = [userEmail];

    const res = await pool.query(query, values);
    const sessions = res.rows;

    return NextResponse.json({ success: true, data: sessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
