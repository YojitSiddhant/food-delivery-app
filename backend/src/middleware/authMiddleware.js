const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const header =
      req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const secret =
      process.env.JWT_SECRET || "SECRET_KEY";
    const decoded = jwt.verify(token, secret);

    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = { protect };
