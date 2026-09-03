"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const details = () => {
  const params = useParams();
  const movieId = params.id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options,
        );

        const creditRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options,
        );

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
          options,
        );

        const detailData = await detailRes.json();
        const creditData = await creditRes.json();
        const similarData = await similarRes.json();

        console.log("Movie Details:", detailData);
        console.log("Cast:", creditData.cast);
        console.log("Crew:", creditData.crew);
        console.log("Similar Movies:", similarData.results);

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovieDetail();
  }, []);

  return (
    <div>
      page
      {params.id}
    </div>
  );
};

export default details;
