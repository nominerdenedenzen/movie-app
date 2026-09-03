import { Button } from "@base-ui/react";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Frame, MovieItems } from ".";

export default function Categories() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          options,
        );
        const data = await res.json();
        setMovies(data.results || []); // Added safety fallback
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPopular = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options,
        );
        const data = await res.json();
        setPopularMovies(data.results || []); // Added safety fallback
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopRated = async () => {
      try {
        // FIXED: Changed /movie/toprated to /movie/top_rated
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options,
        );
        const data = await res.json();
        setTopRatedMovies(data.results || []); // Added safety fallback
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopular();
    fetchUpcoming();
    fetchTopRated();
  }, []);

  return (
    <div className="px-20 py-20 w-screen text-black bg-white">
      <Frame categoryName={"Upcoming"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {movies?.map((movie) => {
          return (
            <MovieItems
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              img={movie.poster_path}
              id={movie.id}
              className="mb-8"
            />
          );
        })}
      </div>

      <Frame categoryName={"Popular"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {popularMovies?.map((movie) => {
          return (
            <MovieItems
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              img={movie.poster_path}
              className="mb-8"
            />
          );
        })}
      </div>

      <Frame categoryName={"Top Rated"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {topRatedMovies?.map((movie) => {
          return (
            <MovieItems
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              img={movie.poster_path}
              className="mb-8"
            />
          );
        })}
      </div>
    </div>
  );
}
