"use client";

import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export const MovieItems = ({ title, rating, img, id, movies }) => {
  const router = useRouter();

  if (movies && movies.length > 0) {
    return (
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => router.push(`/details/${movie.id}`)}
            className="flex flex-col gap-2 rounded-lg bg-[#F4F4F5] p-2 overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-md">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="Poster"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-1 py-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                <span className="font-bold text-sm text-black">
                  {typeof movie.vote_average === "number"
                    ? movie.vote_average.toFixed(1)
                    : movie.vote_average}
                </span>
                <span className="text-xs text-slate-400 font-normal">/10</span>
              </div>
              <h2 className="font-medium text-sm text-black truncate mt-1">
                {movie.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push(`/details/${id}`)}
      className="flex flex-col gap-2 rounded-lg bg-[#F4F4F5] p-2 overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-md">
        <img
          src={`https://image.tmdb.org/t/p/original${img}`}
          alt="Poster"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-1 py-1">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
          <span className="font-bold text-sm text-black">
            {typeof rating === "number" ? rating.toFixed(1) : rating}
          </span>
          <span className="text-xs text-slate-400 font-normal">/10</span>
        </div>
        <h2 className="font-medium text-sm text-black truncate mt-1">
          {title}
        </h2>
      </div>
    </div>
  );
};
