"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import API from "../../services/api";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasUpper = (v) => /[A-Z]/.test(v);
const hasLower = (v) => /[a-z]/.test(v);
const hasNumber = (v) => /[0-9]/.test(v);
const hasSpecial = (v) => /[^A-Za-z0-9]/.test(v);

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errors = useMemo(() => {
    const next = {};

    const nameValue = name.trim();
    if (!nameValue) {
      next.name = "Name is required";
    } else if (nameValue.length < 3) {
      next.name = "Name must be at least 3 characters";
    }

    const emailValue = email.trim();
    if (!emailValue) {
      next.email = "Email is required";
    } else if (!EMAIL_REGEX.test(emailValue)) {
      next.email = "Enter a valid email";
    }

    if (!password) {
      next.password = "Password is required";
    } else {
      const rules = [
        password.length >= 8,
        hasUpper(password),
        hasLower(password),
        hasNumber(password),
        hasSpecial(password),
      ];
      if (!rules[0]) {
        next.password =
          "Password must be at least 8 characters";
      } else if (!rules[1]) {
        next.password =
          "Password must include an uppercase letter";
      } else if (!rules[2]) {
        next.password =
          "Password must include a lowercase letter";
      } else if (!rules[3]) {
        next.password =
          "Password must include a number";
      } else if (!rules[4]) {
        next.password =
          "Password must include a special character";
      }
    }

    if (!confirmPassword) {
      next.confirmPassword =
        "Confirm password is required";
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match";
    }

    return next;
  }, [confirmPassword, email, name, password]);

  const isValid = Object.keys(errors).length === 0;

  const passwordStrength = useMemo(() => {
    const score = [
      password.length >= 8,
      hasUpper(password),
      hasLower(password),
      hasNumber(password),
      hasSpecial(password),
    ].filter(Boolean).length;

    const label =
      score <= 1
        ? "Weak"
        : score <= 3
        ? "Medium"
        : "Strong";

    const color =
      score <= 1
        ? "bg-red-500"
        : score <= 3
        ? "bg-orange-500"
        : "bg-green-500";

    const width =
      score <= 1 ? "w-1/4" : score <= 3 ? "w-2/3" : "w-full";

    return { score, label, color, width };
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (!isValid || isLoading) return;

    try {
      setIsLoading(true);
      const { data } = await API.post(
        "/auth/signup",
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      window.dispatchEvent(new Event("auth:changed"));

      toast.success("Account created successfully");
      router.push("/home");
    } catch (error) {
      const data = error.response?.data;
      const message =
        (Array.isArray(data?.errors) && data.errors[0]) ||
        data?.message ||
        "Signup Failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const borderClass = (field) => {
    const isTouched = touched[field];
    const hasError = Boolean(errors[field]);
    if (!isTouched) return "border-white/15 focus:ring-orange-500";
    if (hasError) return "border-red-500 focus:ring-red-500";
    return "border-green-500 focus:ring-green-500";
  };

  return (
    <div className="relative min-h-screen bg-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.14),transparent_55%)]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center">
        <div className="fade-in-up w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold text-center text-orange-500">
            Create Account
          </h1>

          <p className="text-center text-white/70 mt-2">
            Signup to start ordering delicious food
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-5"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    name: true,
                  }))
                }
                aria-invalid={Boolean(
                  touched.name && errors.name
                )}
                className={[
                  "w-full rounded-xl border bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:ring-2 transition",
                  borderClass("name"),
                ].join(" ")}
              />
              {touched.name && errors.name ? (
                <p className="text-sm text-red-400">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    email: true,
                  }))
                }
                aria-invalid={Boolean(
                  touched.email && errors.email
                )}
                className={[
                  "w-full rounded-xl border bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:ring-2 transition",
                  borderClass("email"),
                ].join(" ")}
              />
              {touched.email && errors.email ? (
                <p className="text-sm text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      password: true,
                    }))
                  }
                  aria-invalid={Boolean(
                    touched.password && errors.password
                  )}
                  className={[
                    "w-full rounded-xl border bg-white/10 p-4 pr-20 text-white outline-none placeholder:text-white/50 focus:ring-2 transition",
                    borderClass("password"),
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((s) => !s)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/15"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Password strength</span>
                  <span className="font-semibold text-white/80">
                    {password ? passwordStrength.label : "—"}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={[
                      "h-full transition-all duration-300",
                      password ? passwordStrength.color : "bg-white/10",
                      password ? passwordStrength.width : "w-0",
                    ].join(" ")}
                  />
                </div>
              </div>

              {touched.password && errors.password ? (
                <p className="text-sm text-red-400">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      confirmPassword: true,
                    }))
                  }
                  aria-invalid={Boolean(
                    touched.confirmPassword &&
                      errors.confirmPassword
                  )}
                  className={[
                    "w-full rounded-xl border bg-white/10 p-4 pr-20 text-white outline-none placeholder:text-white/50 focus:ring-2 transition",
                    borderClass("confirmPassword"),
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((s) => !s)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/15"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {touched.confirmPassword &&
              errors.confirmPassword ? (
                <p className="text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <button
              disabled={!isValid || isLoading}
              className={[
                "w-full rounded-xl bg-orange-500 py-4 font-semibold text-white transition",
                !isValid || isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-orange-600",
              ].join(" ")}
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account...
                </span>
              ) : (
                "Signup"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-white/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-400 font-semibold hover:text-orange-300 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
