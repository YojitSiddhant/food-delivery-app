const { PrismaClient } = require("../generated/prisma");

if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DATABASE_URL is required in production. Set it to a persistent database (e.g. a managed DB, or a persisted SQLite file path)."
    );
  }

  // Dev fallback (SQLite): Prisma expects a url like file:./dev.db
  process.env.DATABASE_URL = "file:./dev.db";
}

const prisma = new PrismaClient();

module.exports = prisma;
