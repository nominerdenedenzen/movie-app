"use client";

import { Button } from "@base-ui/react";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Frame, MovieItems } from ".";
import Upcoming from "./Upcoming";
import Popular from "./Popular";
import Toprated from "./TopRated";

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
        setMovies(data.results || []);
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
        setPopularMovies(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopRated = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options,
        );
        const data = await res.json();
        setTopRatedMovies(data.results || []);
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
      <Upcoming limit={10} />
      <Popular limit={10} />
      <Toprated limit={10} />
    </div>
  );
}
