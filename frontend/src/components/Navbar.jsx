"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUser, Menu, ShoppingCart, X } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const { isLoggedIn, userInfo } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  useEffect(() => {
    if (!isProfileOpen && !isMobileMenuOpen) return;

    const onPointerDown = (e) => {
      const target = e.target;
      const isInsideDesktop =
        desktopProfileRef.current?.contains(target) || false;
      const isInsideMobile =
        mobileProfileRef.current?.contains(target) || false;

      if (!isInsideDesktop) setIsProfileOpen(false);
      if (!isInsideMobile) setIsMobileMenuOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isProfileOpen, isMobileMenuOpen]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("userInfo");
      window.dispatchEvent(new Event("auth:changed"));
    } finally {
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    }
  };

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">
            FoodieHub
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href={isLoggedIn ? "/home" : "/"}
            className="hover:text-orange-400 transition"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <Link
              href="/orders"
              className="hover:text-orange-400 transition"
            >
              Orders
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-orange-400 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-orange-400 transition"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />

              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            </Link>
          ) : null}

          {isLoggedIn ? (
            <div className="relative" ref={desktopProfileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 transition hover:bg-white/10"
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
              >
                <CircleUser size={22} />
              </button>

              {isProfileOpen ? (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur">
                  <div className="px-4 py-3">
                    <p className="text-xs text-white/60">Signed in as</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {userInfo?.name || userInfo?.email || "User"}
                    </p>
                  </div>

                  <div className="h-px bg-white/10" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />

              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            </Link>
          ) : null}

          <div className="relative" ref={mobileProfileRef}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 transition hover:bg-white/10"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {isMobileMenuOpen ? (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur">
                {isLoggedIn ? (
                  <div className="px-4 py-3">
                    <p className="text-xs text-white/60">Signed in as</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {userInfo?.name || userInfo?.email || "User"}
                    </p>
                  </div>
                ) : (
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-white">
                      Welcome to FoodieHub
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      Login to place orders.
                    </p>
                  </div>
                )}

                <div className="h-px bg-white/10" />

                <div className="py-2">
                  <Link
                    href={isLoggedIn ? "/home" : "/"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Home
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Orders
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Cart ({totalItems})
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>

                {isLoggedIn ? (
                  <>
                    <div className="h-px bg-white/10" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
