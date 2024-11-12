
import { pool } from "@/lib/postgres";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/authConfig";

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { result } = await request.json();
  const userEmail = session.user.email; // Usamos el correo electrónico del usuario

  try {
    const query = `INSERT INTO results (user_email, result) VALUES ($1, $2) RETURNING *`;
    const values = [userEmail, result];

    const res = await pool.query(query, values);
    return NextResponse.json(
      { success: true, data: res.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
