const USERS_KEY = "foodiehub:users";

const normalizeEmail = (email) =>
  String(email || "").trim().toLowerCase();

const readUsers = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const createToken = () =>
  `local_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export function localSignup({ name, email, password }) {
  const nextEmail = normalizeEmail(email);
  const nextName = String(name || "").trim();
  const nextPassword = String(password || "");

  if (!nextName) {
    throw new Error("Name is required");
  }
  if (!nextEmail) {
    throw new Error("Email is required");
  }
  if (!nextPassword) {
    throw new Error("Password is required");
  }

  const users = readUsers();
  const exists = users.some((u) => u.email === nextEmail);
  if (exists) throw new Error("User already exists");

  const userRecord = {
    id: Date.now(),
    name: nextName,
    email: nextEmail,
    password: nextPassword,
  };

  writeUsers([userRecord, ...users]);

  return {
    id: userRecord.id,
    name: userRecord.name,
    email: userRecord.email,
    token: createToken(),
  };
}

export function localLogin({ email, password }) {
  const nextEmail = normalizeEmail(email);
  const nextPassword = String(password || "");

  const users = readUsers();
  const user = users.find((u) => u.email === nextEmail);
  if (!user || user.password !== nextPassword) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: createToken(),
  };
}

