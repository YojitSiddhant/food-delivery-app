"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import API from "../../services/api";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = useMemo(() => {
    const next = {};

    const emailValue = email.trim();
    if (!emailValue) {
      next.email = "Email is required";
    } else if (!EMAIL_REGEX.test(emailValue)) {
      next.email = "Enter a valid email";
    }

    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password =
        "Password must be at least 6 characters";
    }

    return next;
  }, [email, password]);

  const isValid = Object.keys(errors).length === 0;

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid || isLoading) return;

    try {
      setIsLoading(true);
      const { data } = await API.post(
        "/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      window.dispatchEvent(new Event("auth:changed"));

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 401
          ? "Invalid credentials"
          : error.response?.data?.message ||
            "Login Failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const emailBorder =
    touched.email && errors.email
      ? "border-red-500 focus:ring-red-500"
      : touched.email && !errors.email
      ? "border-green-500 focus:ring-green-500"
      : "border-white/15 focus:ring-orange-500";

  const passwordBorder =
    touched.password && errors.password
      ? "border-red-500 focus:ring-red-500"
      : touched.password && !errors.password
      ? "border-green-500 focus:ring-green-500"
      : "border-white/15 focus:ring-orange-500";

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
            Welcome Back
          </h1>

          <p className="text-center text-white/70 mt-2">
            Login to continue ordering food
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
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
                  emailBorder,
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
                  placeholder="Enter password"
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
                    passwordBorder,
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
              {touched.password && errors.password ? (
                <p className="text-sm text-red-400">
                  {errors.password}
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-white/70">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-orange-400 font-semibold hover:text-orange-300 transition"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
