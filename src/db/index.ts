import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { existsSync } from "fs";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use /tmp for serverless (Vercel), otherwise use project root
const isVercel = process.env.VERCEL === "1";
const dbDir = isVercel ? "/tmp" : __dirname;
const dbPath = resolve(dbDir, "local.db");

// Create database if it doesn't exist
const sqlite = new Database(dbPath);

// Auto-create table if it doesn't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    submitted_at INTEGER
  )
`);

export const db = drizzle(sqlite, { schema });
