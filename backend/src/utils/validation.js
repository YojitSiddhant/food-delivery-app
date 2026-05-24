const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const validateEmail = (email) =>
  EMAIL_REGEX.test(email);

const validatePasswordStrength = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include an uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include a lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include a number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must include a special character");
  }
  return errors;
};

const pickAuthLoginBody = (body = {}) => ({
  email: normalizeString(body.email),
  password:
    typeof body.password === "string"
      ? body.password
      : "",
});

const pickAuthSignupBody = (body = {}) => ({
  name: normalizeString(body.name),
  email: normalizeString(body.email),
  password:
    typeof body.password === "string"
      ? body.password
      : "",
});

module.exports = {
  isNonEmptyString,
  normalizeString,
  validateEmail,
  validatePasswordStrength,
  pickAuthLoginBody,
  pickAuthSignupBody,
};

