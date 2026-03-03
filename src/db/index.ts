import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use a file-based SQLite database in the project root
const dbPath = resolve(__dirname, "../../local.db");
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
