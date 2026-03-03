import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index";
import { mkdirSync, existsSync } from "fs";

const migrationsFolder = "./src/db/migrations";

// Ensure migrations folder exists
if (!existsSync(migrationsFolder)) {
  mkdirSync(migrationsFolder, { recursive: true });
}

await migrate(db, { migrationsFolder: "./src/db/migrations" });
console.log("Migrations completed successfully");
