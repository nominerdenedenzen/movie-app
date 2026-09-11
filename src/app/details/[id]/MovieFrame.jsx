"use client";

import { PlayIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const MovieFrame = ({
  title,
  rating,
  voteCount,
  posterPath,
  backdropPath,
  releaseDate,
  runtime,
  movieId,
}) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      if (!movieId) return;
      try {
        const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTkyMTk2OTJlMmI4M2U0NjViZWUzODhmY2RlZWRkOCIsIm5iZiI6MTc2MzQyOTQ5Ni4zOTEsInN1YiI6IjY5MWJjYzc4YmQ0ZjI0N2UxYTE3NjBiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z6ZK-29-4pUnr48N5xmQ13lNyqFSFKnys3tWUKasT84",
          },
        });

        const data = await response.json();

        console.log(data);

        setTrailerKey(
          data.results?.find((item) => item.type === "Trailer")?.key,
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrailerKey();
  }, [movieId]);

  return (
    <div className="mt-13 flex flex-col gap-6 mb-8 text-black">
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
        <div className="relative w-full">
          <div className="absolute top-91 left-8 flex gap-3 items-center justify-center z-10">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center h-10 w-10 rounded-full text-black bg-white cursor-pointer hover:bg-zinc-200 transition-colors">
                  <PlayIcon className="h-4 w-4 fill-black" />
                </button>
              </DialogTrigger>
              <DialogContent className="!max-w-4xl !p-0 bg-black border-none rounded-none overflow-hidden shadow-none">
                <div className="w-full aspect-video bg-black flex items-center justify-center">
                  {trailerKey && (
                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                      title="YouTube video player"
                      className="w-full h-full border-0 block"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <p className="text-base text-white font-normal">Play trailer</p>
            <p className="text-sm text-white font-normal mr-2">2:34</p>

            <Link href={`/fullmovie?id=${movieId}`}>
              <button className="flex items-center justify-center py-2.5 px-5 rounded-md text-white font-medium text-sm bg-black/40 ">
                Watch full movie
              </button>
            </Link>
          </div>

          <img
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            className="w-full h-107 object-cover rounded-md"
            alt={`${title} Backdrop`}
          />
        </div>
      </div>
    </div>
  );
};
