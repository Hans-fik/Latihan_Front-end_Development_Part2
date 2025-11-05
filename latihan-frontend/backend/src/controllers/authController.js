// backend/src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// Helper: normalisasi input
function normalizeRegisterBody(body = {}) {
  // Terima username ATAU name dari frontend lama
  const rawUsername = body.username ?? body.name ?? "";
  const username = String(rawUsername).trim();

  const rawEmail = body.email ?? "";
  const email = String(rawEmail).trim().toLowerCase();

  const password = String(body.password ?? "");

  return { username, email, password };
}

export async function register(req, res) {
  try {
    const { username, email, password } = normalizeRegisterBody(req.body);

    // Validasi dasar
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 chars" });
    }

    // Cek duplikat email
    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (exists.rowCount > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password & simpan
    const password_hash = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, avatar_url, created_at`,
      [username, email, password_hash]
    );

    return res.status(201).json(insert.rows[0]);
  } catch (e) {
    // Tangkap unique violation dari Postgres (constraint email unik)
    if (e && e.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: e.message || "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const email = String((req.body?.email ?? "")).trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const q = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );
    if (q.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "2h" }
    );

    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Internal server error" });
  }
}