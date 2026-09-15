import React, { useEffect, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreParam = searchParams.get("id");
  const selectedGenres = genreParam ? genreParam.split(",").map(Number) : [];

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const endpoint = `https://api.themoviedb.org/3/genre/movie/list`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json();
        setGenres(data.genres || []);
        console.log("data", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenreMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenres.length === 0) {
        setMovies([]);
        return;
      }

      try {
        const endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenres}`;
        const response = await fetch(endpoint, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json();
        console.log("DATA", data);
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, [genreParam]);

  const handleChoose = (id) => {
    const nextGenres = selectedGenres.includes(id)
      ? selectedGenres.filter((item) => item !== id)
      : [...selectedGenres, id];

    router.push(`/genre?id=${nextGenres}`);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {genres?.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);

          return (
            <Badge
              key={genre.id}
              onClick={() => handleChoose(genre.id)}
              variant={isSelected ? "default" : "secondary"}
              className="flex items-center justify-between gap-1.5 py-1.5 px-3 cursor-pointer select-none"
            >
              <span>{genre.name}</span>

              {isSelected ? (
                <X className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3 opacity-50" />
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default GenreList;
