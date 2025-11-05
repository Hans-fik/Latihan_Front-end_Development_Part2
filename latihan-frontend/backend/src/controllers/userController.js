import { pool } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

// GET /api/users (contoh: list user sederhana)
export async function getUsers(_req, res) {
  try {
    const q = await pool.query(
      "SELECT id, username, email, avatar_url, created_at FROM users ORDER BY id DESC"
    );
    res.json(q.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// PUT /api/users/:id (update username/email milik sendiri)
export async function editUser(req, res) {
  const { id } = req.params;
  const { username, email } = req.body || {};

  if (parseInt(id, 10) !== req.user?.id)
    return res.status(403).json({ message: "Forbidden" });

  if (!username || !email) return res.status(400).json({ message: "Missing fields" });

  try {
    const q = await pool.query(
      "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id, username, email, avatar_url",
      [username, email, id]
    );
    if (!q.rowCount) return res.status(404).json({ message: "User not found" });
    res.json(q.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// POST /api/users/avatar (upload avatar via Cloudinary)
export async function uploadAvatar(req, res) {
  if (!req.file) return res.status(400).json({ message: "No file provided" });

  try {
    // Upload ke Cloudinary dari buffer
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "latihan-frontend/avatars", resource_type: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const q = await pool.query(
      "UPDATE users SET avatar_url=$1 WHERE id=$2 RETURNING id, username, email, avatar_url",
      [uploaded.secure_url, req.user?.id]
    );

    res.json(q.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}