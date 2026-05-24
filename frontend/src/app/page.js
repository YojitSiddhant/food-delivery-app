"use client";

import Navbar from "../components/Navbar";
import LandingSlider from "../components/LandingSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <LandingSlider />
    </div>
  );
}
