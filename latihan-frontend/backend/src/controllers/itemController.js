import { pool } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

function asText(v) {
  return String(v ?? "").trim();
}

async function uploadBufferToCloudinary(buffer) {
  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "latihan-frontend/items", resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });
}

/** GET /api/items — hanya item milik user */
export async function getItems(req, res) {
  try {
    const userId = req.user?.id;
    const q = await pool.query(
      `SELECT id, title, description, image_url, created_at, updated_at
         FROM items
        WHERE user_id = $1
        ORDER BY id DESC`,
      [userId]
    );
    res.json(q.rows);
  } catch (e) {
    res.status(500).json({ message: e.message || "Internal server error" });
  }
}

/** POST /api/items — buat item (optional file) */
export async function createItem(req, res) {
  try {
    const userId = req.user?.id;
    const title = asText(req.body?.title);
    const description = asText(req.body?.description);
    if (!title || !description) return res.status(400).json({ message: "Missing fields" });

    let imageUrl = null;
    if (req.file && req.file.buffer) {
      const uploaded = await uploadBufferToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    const q = await pool.query(
      `INSERT INTO items (title, description, user_id, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, description, image_url, created_at, updated_at`,
      [title, description, userId, imageUrl]
    );
    res.status(201).json(q.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message || "Internal server error" });
  }
}

/** PUT /api/items/:id — update item (optional file, jaga image lama) */
export async function updateItem(req, res) {
  try {
    const userId = req.user?.id;
    const id = parseInt(req.params.id, 10);
    const title = asText(req.body?.title);
    const description = asText(req.body?.description);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    if (!title || !description) return res.status(400).json({ message: "Missing fields" });

    // Ambil image lama (milik user)
    const cur = await pool.query(
      `SELECT image_url FROM items WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    if (!cur.rowCount) return res.status(404).json({ message: "Item not found" });
    let imageUrl = cur.rows[0].image_url;

    // Jika ada file baru → upload & timpa
    if (req.file && req.file.buffer) {
      const uploaded = await uploadBufferToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    const q = await pool.query(
      `UPDATE items
          SET title=$1, description=$2, image_url=$3
        WHERE id=$4 AND user_id=$5
        RETURNING id, title, description, image_url, created_at, updated_at`,
      [title, description, imageUrl, id, userId]
    );
    if (!q.rowCount) return res.status(404).json({ message: "Item not found" });

    res.json(q.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message || "Internal server error" });
  }
}

/** DELETE /api/items/:id — hanya milik user */
export async function deleteItem(req, res) {
  try {
    const userId = req.user?.id;
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

    const q = await pool.query(
      `DELETE FROM items WHERE id=$1 AND user_id=$2 RETURNING id`,
      [id, userId]
    );
    if (!q.rowCount) return res.status(404).json({ message: "Item not found" });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message || "Internal server error" });
  }
}