// backend/src/config/db.js
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// optional: log error agar mudah debug
pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
});

export default pool;