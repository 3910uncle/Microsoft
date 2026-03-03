import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";

// Use a file-based SQLite database
const sqlite = new Database("local.db");
export const db = drizzle(sqlite, { schema });
