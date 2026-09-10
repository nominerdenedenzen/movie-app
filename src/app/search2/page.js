"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MovieItems } from "../_components";

import { Badge, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "Western",
];

const Filterbyword = () => {
  const params = useParams();
  const movieId = params?.id;

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
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
            },
          },
        );

        const data = await response.json();
        setMovies(data.results || []);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId, page]);

  return (
    <div className="flex flex-col gap-6 mt-16 px-20">
      <h2 className="font-semibold text-[30px]">Search Results</h2>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-8 flex-1">
          <h3 className="font-semibold text-[20px]">
            {movies?.length || 0} titles found
          </h3>

          <div className="flex flex-col gap-8 min-h-\[400px\]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
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

        <div className="w-px bg-[#E4E4E7] self-stretch" />

        <div className="flex flex-col gap-4 w-80 shrink-0">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-[24px]">Genres</h3>
            <p className="text-base font-normal text-[16px]">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <div key={genre} className="p-0">
                <Badge
                  variant="secondary"
                  className="flex items-center justify-between py-1.5 px-3 gap-2 text-[12px] w-full bg-white border-[#E4E4E7] text-black"
                >
                  {genre}
                  <ChevronRight className="h-3 w-3 opacity-50" />
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbyword;
