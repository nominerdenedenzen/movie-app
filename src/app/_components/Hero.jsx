"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  const currentMovie = movies[currentIndex];

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          options,
        );
        const data = await res.json();
        setMovies(data.results?.slice(0, 5) || []);
      } catch (err) {
        console.error("Failed to fetch hero movies:", err);
      }
    };

    fetchUpcoming();
  }, []);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      if (!currentMovie?.id) return;
      try {
        const endpoint = `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?language=en-US`;

        const response = await fetch(endpoint, options);
        const data = await response.json();

        setTrailerKey(
          data.results?.find((item) => item.type === "Trailer")?.key ||
            data.results?.[0]?.key,
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrailerKey();
  }, [currentMovie?.id]);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-150 bg-black text-white group mt-6 rounded-2xl overflow-hidden shadow-xl">
      <img
        src={
          currentMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
            : "/Poster.png"
        }
        alt={currentMovie.title || "Movie Banner"}
        className="absolute w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      <div className="absolute left-12 bottom-12 z-10 max-w-lg">
        <div className="flex flex-col gap-3">
          <span className="font-normal text-sm text-slate-300 uppercase tracking-wider">
            Now Playing:
          </span>
          <h1 className="text-[36px] font-extrabold leading-tight drop-shadow-md">
            {currentMovie.title}
          </h1>

          <div className="flex items-center gap-2">
            <Star className="fill-amber-400 h-6 w-6 text-amber-400 shrink-0" />
            <span className="font-semibold text-[18px]">
              {currentMovie.vote_average?.toFixed(1)}
            </span>
            <span className="text-xs text-slate-300">/10</span>
          </div>

          <p className="text-[13px] font-normal leading-relaxed text-slate-200 line-clamp-3">
            {currentMovie.overview}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-200 transition-all w-fit mt-2 shadow-md active:scale-95 cursor-pointer">
                <Play className="h-4 w-4 fill-black text-black" />
                Watch Trailer
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl! p-0! bg-black border-none rounded-none overflow-hidden shadow-none">
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
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#F4F4F5]/80 hover:bg-white text-black p-3 rounded-full z-20 transition-all hover:scale-110 shadow-md cursor-pointer"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#F4F4F5]/80 hover:bg-white text-black p-3 rounded-full z-20 transition-all hover:scale-110 shadow-md cursor-pointer"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
