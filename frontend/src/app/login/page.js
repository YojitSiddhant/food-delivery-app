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
  KeyRound,
  Mail,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

import { localLogin } from "../../utils/localAuth";

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
      const data = localLogin({
        email: email.trim(),
        password,
      });

      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      window.dispatchEvent(new Event("auth:changed"));

      toast.success("Login successful");
      router.push("/home");
    } catch (error) {
      toast.error(error?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const emailBorder =
    touched.email && errors.email
      ? "border-red-500 focus:ring-red-500"
      : touched.email && !errors.email
      ? "border-green-500 focus:ring-green-500"
      : "border-slate-200 focus:ring-orange-500";

  const passwordBorder =
    touched.password && errors.password
      ? "border-red-500 focus:ring-red-500"
      : touched.password && !errors.password
      ? "border-green-500 focus:ring-green-500"
      : "border-slate-200 focus:ring-orange-500";

  return (
    <div className="min-h-screen bg-slate-950 overscroll-none">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
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
                WELCOME BACK
              </div>
              <h1 className="slide-title-in mt-3 text-5xl font-bold leading-tight">
                Manage your{" "}
                <span className="text-orange-400">
                  food orders
                </span>
              </h1>
              <p className="slide-subtitle-in mt-5 text-lg text-white/75">
                Fast reordering, live tracking, and secure payments — built for
                everyday cravings.
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

        <section className="relative flex items-start justify-center bg-white px-6 py-10 lg:items-center lg:px-12">
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
            <h2 className="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-slate-600">
              Enter your credentials to access your dashboard
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                      emailBorder,
                    ].join(" ")}
                  />
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                {touched.email && errors.email ? (
                  <p className="text-sm text-red-600">{errors.email}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast("Password reset coming soon")}
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                      "w-full rounded-xl border bg-white px-4 py-3 pl-11 pr-12 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 transition",
                      passwordBorder,
                    ].join(" ")}
                  />
                  <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <p className="text-sm text-red-600">{errors.password}</p>
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
                    Signing in...
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2">
                    Sign In <span aria-hidden>→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm">
              <p className="text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-orange-700 hover:text-orange-800 transition"
                >
                  Signup
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
