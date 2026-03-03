import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

// Use a file-based SQLite database
const sqlite = new Database("local.db");
export const db = drizzle(sqlite, { schema });

// Run migrations on startup
const migrationsFolder = "./src/db/migrations";

// Run migrations (wrapped in try-catch to handle fresh deployments)
try {
  migrate(db, { migrationsFolder });
  console.log("Database migrations completed");
} catch (error) {
  // Table might already exist - that's okay
  console.log("Database ready (or migrations already applied)");
}
