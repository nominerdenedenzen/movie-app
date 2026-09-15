"use client";

import { ArrowRight, Loader2, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MovieSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleType = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      e.target.blur();
      if (query.trim()) {
        router.push(`/search?q=${query}`);
      }
    }
  };

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setIsOpen(false);
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const endpoint = `https://api.themoviedb.org/3/search/movie?query=${query}&page=1`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc4MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setResults(data.results.slice(0, 5));
          setIsOpen(true);
        } else {
          setResults([]);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setIsLoading(false);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSearch, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-80">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={handleType}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full rounded-md border border-[#E4E4E7] bg-white text-zinc-900 pl-9 pr-9 py-2 text-sm placeholder-zinc-400 outline-none focus:border-zinc-400"
        />
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-4 text-zinc-500">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-500">
              No results found
            </div>
          ) : (
            results.map((movie) => (
              <div
                key={movie.id}
                className="p-3 border-b border-zinc-100 last:border-none hover:bg-zinc-50"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded-md shrink-0 bg-zinc-100"
                  />

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 truncate">
                        {movie.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-zinc-600 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                        <span>
                          {movie.vote_average.toFixed(1)}
                          /10
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-zinc-500 mt-1">
                      <p>{movie.release_date}</p>
                      <Link
                        href={`/details/${movie.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-1 font-medium text-zinc-900 hover:underline"
                      >
                        See more <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
