"use client";

import { Hero } from "./_components";
import Categories from "./_components/Categories";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <Hero />
      <Categories />
    </div>
  );
}
