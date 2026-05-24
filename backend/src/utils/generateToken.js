const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const secret =
    process.env.JWT_SECRET || "SECRET_KEY";

  return jwt.sign({ id }, secret, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
