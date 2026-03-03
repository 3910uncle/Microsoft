import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { existsSync, mkdirSync } from "fs";

const sqlite = new Database("local.db");
export const db = drizzle(sqlite, { schema });

// Run migrations on startup
const migrationsFolder = "./src/db/migrations";
if (!existsSync(migrationsFolder)) {
  mkdirSync(migrationsFolder, { recursive: true });
}

// Run migrations (wrapped in try-catch to handle fresh deployments)
try {
  migrate(db, { migrationsFolder });
  console.log("Database migrations completed");
} catch (error) {
  // Table might already exist - that's okay
  console.log("Database ready (or migrations already applied)");
}
