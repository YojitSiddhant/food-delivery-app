"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingSlider() {
  const slides = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=2000&q=80",
        badge: "FoodieHub",
        title: "Delicious Food, Delivered Fast",
        subtitle:
          "Discover top-rated dishes and get them delivered to your doorstep in minutes.",
        points: [
          "Fresh meals from nearby kitchens",
          "Fast delivery with live updates",
          "Simple, secure checkout",
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2000&q=80",
        badge: "Trusted Partners",
        title: "Curated Restaurants Near You",
        subtitle:
          "We partner with quality kitchens so every bite tastes just right.",
        points: [
          "Verified restaurant partners",
          "Consistent quality & packaging",
          "Wide variety of cuisines",
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=2000&q=80",
        badge: "Live Updates",
        title: "Track Your Order, Anytime",
        subtitle:
          "Stay updated from kitchen to your door with a smooth, reliable experience.",
        points: [
          "Real-time order status",
          "Accurate delivery ETAs",
          "Support when you need it",
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=2000&q=80",
        badge: "Exclusive Offers",
        title: "Deals That Make You Smile",
        subtitle:
          "Save more with special discounts, bundles, and limited-time offers.",
        points: [
          "Seasonal discounts",
          "Combo meals & bundles",
          "Best value picks",
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=2000&q=80",
        badge: "For Everyone",
        title: "Veg, Non‑Veg & More",
        subtitle:
          "From comfort food to healthy bowls — find something perfect for every mood.",
        points: [
          "Filters for quick discovery",
          "Clear item descriptions",
          "Great taste, every time",
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const total = slides.length;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () =>
      media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);

    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  const goTo = (index) => {
    setActive(((index % total) + total) % total);
  };

  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-black">
        <div className="relative h-[calc(100vh-72px)] w-full min-h-[520px] sm:min-h-[560px]">
          {slides.map((slide, idx) => (
            <div
              key={slide.title}
              className={[
                "absolute inset-0 transition-opacity duration-700",
                idx === active ? "opacity-100" : "opacity-0",
              ].join(" ")}
              aria-hidden={idx !== active}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.22),transparent_55%)]" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6 sm:px-10 lg:px-14">
              <div className="fade-in-up max-w-2xl">
                <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  {slides[active].badge}
                </div>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {slides[active].title}
                </h1>

                <p className="mt-4 text-lg text-white/80 sm:text-xl">
                  {slides[active].subtitle}
                </p>

                {slides[active].points?.length ? (
                  <ul className="mt-5 flex flex-col gap-2 text-white/80">
                    {slides[active].points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm sm:text-base"
                      >
                        <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/login"
                    className="w-full sm:w-auto rounded-xl bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-base font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 sm:px-10 lg:px-14">
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition",
                    idx === active
                      ? "bg-orange-500"
                      : "bg-white/35 hover:bg-white/60",
                  ].join(" ")}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                aria-label="Previous slide"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                aria-label="Next slide"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
