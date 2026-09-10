"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieFrame } from "./MovieFrame";
import { MovieDetails } from "./MovieDetails";
import { MoreLike } from "./MoreLike";

const details = () => {
  const params = useParams();
  const movieId = params.id;

  const [movieDetail, setMovieDetail] = useState();
  const [credits, setCredits] = useState();
  const [similar, setSimilar] = useState();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  useEffect(() => {
    setMovieDetail(null);
    setCredits(null);
    setSimilar(null);

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

        setMovieDetail(detailData);
        setCredits(creditData);
        setSimilar(similarData);
      } catch (err) {
        console.error(err);
      }
    };

    if (movieId) fetchMovieDetail();
  }, [movieId]);

  if (!movieDetail) {
    return <div className="px-45 py-10">Loading...</div>;
  }

  return (
    <div className="px-45">
      <MovieFrame
        title={movieDetail.title}
        rating={movieDetail.vote_average}
        voteCount={movieDetail.vote_count}
        releaseDate={movieDetail.release_date}
        runtime={movieDetail.runtime}
        posterPath={movieDetail.poster_path}
        backdropPath={movieDetail.backdrop_path}
      />
      <MovieDetails movieDetail={movieDetail} creditData={credits} />
      <MoreLike similarMovies={similar} />
    </div>
  );
};

export default details;
