"use client";

import { Footer, Hero } from "./_components";
import Categories from "./_components/Categories";
import { Navigation } from "./_components/Navigation";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <Navigation />
      <Hero />
      <Categories />
      <Footer />
    </div>
  );
}
