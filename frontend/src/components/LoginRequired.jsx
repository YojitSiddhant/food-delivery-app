"use client";

import Link from "next/link";

export default function LoginRequired() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12),transparent_55%)]" />
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center px-6 py-14">
          <div className="fade-in-up w-full max-w-xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-600">
              Access Restricted
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
              Login Required
            </h2>

            <p className="mt-3 text-lg text-gray-600">
              Please login to explore delicious food items and place orders.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="w-full sm:w-auto rounded-xl bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-7 py-3 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

