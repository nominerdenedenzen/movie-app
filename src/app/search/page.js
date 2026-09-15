"use client";

import { useState, useEffect, use } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { GENRE_MAP } from "@/lib/genres";
import { Badge } from "../../../@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { MovieItems } from "../_components";
import { Skeleton } from "@/components/ui/skeleton";
import GenreList from "../_components/Genres";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  console.log("Current search query:", query);

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
  }, [query]);
  useEffect(() => {
    const fetchSearchMovies = async () => {
      if (!query) return;

      try {
        setIsLoading(true);

        const endpoint = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;

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

    fetchSearchMovies();
  }, [query, page]);

  return (
    <div className="flex flex-col gap-6 mt-16 px-20 text-black">
      <h2 className="font-semibold text-[30px]">Search results</h2>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-8 flex-1">
          <h3 className="font-semibold text-[20px]">
            {movies.length} results for {query}
          </h3>

          <div className="flex flex-col gap-8 min-h-100">
            {isLoading ? (
              <Skeleton count={8} />
            ) : movies.length > 0 ? (
              <MovieItems movies={movies} />
            ) : (
              <div className="flex flex-col items-center justify-center px-5 py-6 border rounded-lg border-[#E4E4E7]">
                <p className="text-black font-medium text-[14px]">
                  No results found.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 py-6 text-black">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 flex gap-2 rounded-md items-center border border-[#E4E4E7] text-sm disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm font-medium">{page}</span>
            <button
              onClick={handleNext}
              className="px-4 py-2 flex gap-2 rounded-md items-center border border-[#E4E4E7] text-sm cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-px bg-[#E4E4E7] self-stretch" />

        <div className="flex flex-col gap-4 w-80 shrink-0">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-[24px]">Genres</h3>
            <p className="text-base font-normal text-[16px]">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <GenreList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
