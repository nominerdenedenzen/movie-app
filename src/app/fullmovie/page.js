"use client";

import { useSearchParams } from "next/navigation";

const Fullmovie = () => {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-5xl aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
        {!movieId ? (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No Movie ID provided.
          </div>
        ) : (
          <iframe
            src={`https://player.videasy.to/movie/${movieId}`}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            allow="encrypted-media"
            title="Movie player"
          />
        )}
      </div>
    </div>
  );
};

export default Fullmovie;
