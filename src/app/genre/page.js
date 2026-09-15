"use client";

import { useState, useEffect, use } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GENRE_MAP } from "@/lib/genres";
import { MovieItems } from "../_components";
import { Badge } from "../_components/Badge";
import GenreList from "@/app/_components/Genres";
import { useSearchParams } from "next/navigation";

const GenreFilter = ({ params }) => {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const genreId = searchParams.get("id");

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!genreId) return;

      try {
        setIsLoading(true);

        const endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId, page]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col gap-6 mt-16 px-20 pb-16">
      <h2 className="font-semibold text-[30px] text-zinc-900">
        Search Results
      </h2>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-4 w-80 shrink-0">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-[24px] text-zinc-900">Genres</h3>
            <p className="text-base font-normal text-[16px] text-zinc-500">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <GenreList />
          </div>
        </div>

        <div className="w-px bg-zinc-200 self-stretch" />

        <div className="flex flex-col gap-8 flex-1">
          <h3 className="font-semibold text-[20px] text-zinc-900">
            {movies?.length || 0} titles found
          </h3>

          <div className="flex flex-col gap-8">
            {isLoading ? (
              <p className="text-zinc-500">Loading movies...</p>
            ) : (
              <MovieItems movies={movies} />
            )}
          </div>

          <div className="flex items-center justify-center gap-4 py-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 flex gap-2 rounded-md items-center border border-zinc-200 bg-white text-zinc-900 text-sm hover:bg-zinc-50 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-700" />
              Previous
            </button>
            <span className="text-sm font-medium text-zinc-900">{page}</span>
            <button
              onClick={handleNext}
              className="px-4 py-2 flex gap-2 rounded-md items-center border border-zinc-200 bg-white text-zinc-900 text-sm hover:bg-zinc-50 cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4 text-zinc-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
