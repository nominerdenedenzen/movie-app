"use client";

import { useState, useEffect, use } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GENRE_MAP } from "@/lib/genres";
import { MovieItems } from "../../_components";
import { Badge } from "../../_components/Badge";

const Search = ({ params }) => {
  const resolvedParams = use(params);
  const genreId = resolvedParams.id;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

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
  }, [genreId, searchQuery]);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setIsLoading(true);

        let endpoint = "";
        if (genreId) {
          endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`;
        } else if (searchQuery) {
          endpoint = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchQuery,
          )}&page=${page}`;
        } else {
          endpoint = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
        }

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
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId, searchQuery, page]);

  return (
    <div className="flex flex-col gap-6 mt-16 px-20">
      <h2 className="font-semibold text-[30px]">Search Results</h2>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-4 w-80 shrink-0">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-[24px]">Genres</h3>
            <p className="text-base font-normal text-[16px]">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(GENRE_MAP).map(([genreName, id]) => (
              <div key={id} className="p-0">
                <Link href={`/genre/${id}`}>
                  <Badge
                    variant="secondary"
                    className="flex items-center justify-between py-1.5 px-3 gap-2 text-[12px] w-full bg-white border-[#E4E4E7] text-black hover:bg-zinc-100 cursor-pointer"
                  >
                    {genreName}
                    <ChevronRight className="h-3 w-3 opacity-50" />
                  </Badge>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="w-px bg-[#E4E4E7] self-stretch" />

        <div className="flex flex-col gap-8 flex-1">
          <h3 className="font-semibold text-[20px]">
            {movies?.length || 0} titles found
          </h3>
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <p className="text-muted-foreground">Loading movies...</p>
            ) : (
              <MovieItems movies={movies} />
            )}
          </div>

          <div className="flex items-center justify-center gap-4 py-6">
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
      </div>
    </div>
  );
};

export default Search;
