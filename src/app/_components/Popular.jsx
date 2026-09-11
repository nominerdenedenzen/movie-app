"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@base-ui/react";
import { ChevronRight } from "lucide-react";
import { MovieItems } from ".";
import { Pagination } from "./Pagination";

const Popular = ({ limit }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          options,
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopular();
  }, [page]);

  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  return (
    <>
      <div className="flex justify-between items-center mt-15">
        <h1 className="font-semibold text-[24px]">Popular</h1>
        {limit && (
          <Link href="/popular">
            <Button className="flex items-center gap-1 py-2 px-4 cursor-pointer">
              See More <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {displayedMovies.map((movie) => (
          <MovieItems
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            img={movie.poster_path}
            className="mb-8"
          />
        ))}
      </div>

      {!limit && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default Popular;
