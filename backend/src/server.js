const app = require("./app");
const path = require("path");
const { execFile } = require("child_process");

const PORT = process.env.PORT || 5000;

const runMigrations = () =>
  new Promise((resolve, reject) => {
    const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
    execFile(
      npxCmd,
      ["prisma", "migrate", "deploy", "--schema", "prisma/schema.prisma"],
      { cwd: path.resolve(__dirname, "..") },
      (error, stdout, stderr) => {
        if (stdout) console.log(stdout.trim());
        if (stderr) console.error(stderr.trim());
        if (error) return reject(error);
        resolve();
      }
    );
  });

const start = async () => {
  try {
    await runMigrations();
  } catch (error) {
    console.error("Prisma migrate deploy failed:", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
