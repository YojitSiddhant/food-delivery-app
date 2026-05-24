const { PrismaClient } = require("../generated/prisma");

if (!process.env.DATABASE_URL) {
  // Fallback (SQLite): Prisma expects a url like file:./dev.db
  // Note: In production, this will be ephemeral on many hosts unless backed by a persistent disk.
  // Prefer setting DATABASE_URL to a persistent DB (e.g. Postgres) or a persisted SQLite path.
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[db] DATABASE_URL is not set. Falling back to SQLite at file:./dev.db (this may NOT persist across deploys)."
    );
  }

  process.env.DATABASE_URL = "file:./dev.db";
}

const prisma = new PrismaClient();

module.exports = prisma;
