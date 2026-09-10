"use client";

import { Star } from "lucide-react";

export const MovieFrame = ({
  title,
  rating,
  voteCount,
  posterPath,
  backdropPath,
  releaseDate,
  runtime,
}) => {
  return (
    <div className="mt-13 flex flex-col gap-6 mb-8">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="font-extrabold text-[36px]">{title}</h1>
          <p className="text-lg text-[18px] font-normal">
            {releaseDate} · {runtime} min
          </p>
        </div>
        <div>
          <p className="font-medium text-[12px] text-xs">Rating</p>
          <div className="flex gap-1">
            <Star className="fill-amber-400 text-amber-400 h-7 w-7" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold text-[18px]">
                  {typeof rating === "number" ? rating.toFixed(1) : rating}
                </p>
                <span className="text-base text-[16px] font-normal text-[#71717A]">
                  /10
                </span>
              </div>
              <p className="font-normal text-[12px] text-[#71717A] text-xs">
                {voteCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          className="w-72.5 h-107 object-cover rounded-md"
          alt={`${title} Poster`}
        />

        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          className="w-full h-107 object-cover rounded-md"
          alt={`${title} Backdrop`}
        />
      </div>
    </div>
  );
};
