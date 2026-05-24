const { PrismaClient } = require("../generated/prisma");

if (!process.env.DATABASE_URL) {
  // Fallback for environments where DATABASE_URL isn't set.
  // For SQLite, Prisma expects a url like: file:./dev.db
  process.env.DATABASE_URL = "file:./dev.db";
}

const prisma = new PrismaClient();

module.exports = prisma;
