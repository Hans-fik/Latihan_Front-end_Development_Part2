-- =========================================================
-- DATABASE SCHEMA: Latihan_Frontend2 (Full-Stack CRUD + Upload)
-- =========================================================

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT, -- foto profil user (Cloudinary)
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- ITEMS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT, -- gambar item (Cloudinary)
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================================
-- FUNCTION & TRIGGER: Auto-update updated_at on UPDATE
-- =========================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_items_updated ON items;
CREATE TRIGGER trg_items_updated
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- SAMPLE DATA (optional untuk testing)
-- =========================================================
-- INSERT INTO users (username, email, password_hash)
-- VALUES ('demo', 'demo@example.com', '$2b$10$hashedPassword');

-- INSERT INTO items (title, description, image_url, user_id)
-- VALUES ('Contoh Item', 'Deskripsi contoh item', NULL, 1);

-- =========================================================
-- END OF SCHEMA
-- =========================================================
