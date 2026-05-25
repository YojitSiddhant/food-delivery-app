"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BarChart3,
  Clock,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  Truck,
  User,
  UtensilsCrossed,
} from "lucide-react";

import { localSignup } from "../../utils/localAuth";

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
      const data = localSignup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      window.dispatchEvent(new Event("auth:changed"));

      toast.success("Account created successfully");
      router.push("/home");
    } catch (error) {
      toast.error(error?.message || "Signup Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const borderClass = (field) => {
    const isTouched = touched[field];
    const hasError = Boolean(errors[field]);
    if (!isTouched) return "border-slate-200 focus:ring-orange-500";
    if (hasError) return "border-red-500 focus:ring-red-500";
    return "border-green-500 focus:ring-green-500";
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950">
      <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
        <section className="relative hidden h-full overflow-hidden px-6 py-10 text-white lg:block lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.16),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,23,42,0.96),rgba(15,23,42,0.82),rgba(15,23,42,0.96))]" />
          </div>

          <div className="relative mx-auto flex h-full w-full max-w-xl flex-col">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                <UtensilsCrossed className="h-5 w-5 text-orange-300" />
              </div>
              <div className="leading-tight">
                <div className="text-xl font-semibold">
                  Food Delivery App
                </div>
                <div className="text-sm text-white/70">
                  Order. Track. Enjoy.
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="text-sm font-semibold tracking-widest text-orange-300/90">
                GET STARTED
              </div>
              <h1 className="slide-title-in mt-3 text-5xl font-bold leading-tight">
                Create your{" "}
                <span className="text-orange-400">
                  new account
                </span>
              </h1>
              <p className="slide-subtitle-in mt-5 text-lg text-white/75">
                Save addresses, reorder favorites, and track deliveries in real
                time.
              </p>
            </div>

            <div className="slide-points-in mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/20">
                    <Truck className="h-4 w-4 text-orange-300" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Live Tracking
                    </div>
                    <div className="text-xs text-white/70">
                      Know exactly where your order is.
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-500/20">
                    <Clock className="h-4 w-4 text-indigo-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Quick Reorder
                    </div>
                    <div className="text-xs text-white/70">
                      Repeat favorites in one tap.
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/20">
                    <ShieldCheck className="h-4 w-4 text-emerald-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Secure Checkout
                    </div>
                    <div className="text-xs text-white/70">
                      Encrypted payment experience.
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500/15 ring-1 ring-sky-500/20">
                    <BarChart3 className="h-4 w-4 text-sky-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Smart Suggestions
                    </div>
                    <div className="text-xs text-white/70">
                      Discover meals you&apos;ll love.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 text-xs text-white/50">
              Designed &amp; built for delicious experiences.
            </div>
          </div>
        </section>

        <section className="relative flex h-full items-center justify-center overflow-hidden bg-white px-6 py-0 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-slate-900/5 blur-3xl" />
          </div>

          <div className="fade-in-up relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to landing
            </Link>

            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-600 text-white">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-semibold text-slate-900">
                  Food Delivery App
                </div>
                <div className="text-xs text-slate-500">
                  Order. Track. Enjoy.
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-slate-600">
              Sign up to start ordering delicious food
            </p>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        name: true,
                      }))
                    }
                    aria-invalid={Boolean(touched.name && errors.name)}
                    className={[
                      "w-full rounded-xl border bg-white px-4 py-3 pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 transition",
                      borderClass("name"),
                    ].join(" ")}
                  />
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                {touched.name && errors.name ? (
                  <p className="text-sm text-red-600">{errors.name}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        email: true,
                      }))
                    }
                    aria-invalid={Boolean(touched.email && errors.email)}
                    className={[
                      "w-full rounded-xl border bg-white px-4 py-3 pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 transition",
                      borderClass("email"),
                    ].join(" ")}
                  />
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                {touched.email && errors.email ? (
                  <p className="text-sm text-red-600">{errors.email}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        password: true,
                      }))
                    }
                    aria-invalid={Boolean(touched.password && errors.password)}
                    className={[
                      "w-full rounded-xl border bg-white px-4 py-3 pr-12 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 transition",
                      borderClass("password"),
                    ].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="mt-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Password strength</span>
                    <span className="font-semibold text-slate-700">
                      {password ? passwordStrength.label : "—"}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={[
                        "h-full transition-all duration-300",
                        password ? passwordStrength.color : "bg-slate-200",
                        password ? passwordStrength.width : "w-0",
                      ].join(" ")}
                    />
                  </div>
                </div>

                {touched.password && errors.password ? (
                  <p className="text-sm text-red-600">{errors.password}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        confirmPassword: true,
                      }))
                    }
                    aria-invalid={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    className={[
                      "w-full rounded-xl border bg-white px-4 py-3 pr-12 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 transition",
                      borderClass("confirmPassword"),
                    ].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword ? (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <button
                disabled={!isValid || isLoading}
                className={[
                  "w-full rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition shadow-sm",
                  !isValid || isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-orange-700",
                ].join(" ")}
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2">
                    Sign Up <span aria-hidden>→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-orange-700 hover:text-orange-800 transition"
                >
                  Login
                </Link>
              </p>
              <div className="inline-flex items-center gap-2 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Secured with encryption
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
