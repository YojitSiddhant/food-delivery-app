const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const generateToken = require("../utils/generateToken");
const {
  pickAuthLoginBody,
  pickAuthSignupBody,
  validateEmail,
  validatePasswordStrength,
} = require("../utils/validation");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } =
      pickAuthSignupBody(req.body);

    const validationErrors = [];
    if (name.length < 3) {
      validationErrors.push(
        "Name must be at least 3 characters"
      );
    }
    if (!email) {
      validationErrors.push("Email is required");
    } else if (!validateEmail(email)) {
      validationErrors.push("Invalid email");
    }

    if (!password) {
      validationErrors.push("Password is required");
    } else {
      validationErrors.push(
        ...validatePasswordStrength(password)
      );
    }

    if (validationErrors.length) {
      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = pickAuthLoginBody(
      req.body
    );

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
