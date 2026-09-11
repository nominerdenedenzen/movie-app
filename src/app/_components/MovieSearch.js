"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Search, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsOpen(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const endpoint = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query,
        )}&page=1`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc4MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json();
        setResults((data.results || []).slice(0, 5));
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div
      className="relative w-80"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search..."
          className="w-full rounded-md border border-[#E4E4E7] bg-white text-zinc-900 pl-9 pr-9 py-2 text-sm placeholder-zinc-400 outline-none focus:border-zinc-400"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 h-4 w-4 text-zinc-400 animate-spin" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 p-2">
          {results.map((movie, index) => (
            <div key={movie.id}>
              <Link
                href={`/details/${movie.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between gap-3 p-2 hover:bg-zinc-50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded-md shrink-0 bg-zinc-100"
                  />

                  <div className="flex flex-col gap-0.5 truncate">
                    <h4 className="font-semibold text-sm text-zinc-900 truncate">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <span>{movie.vote_average?.toFixed(1) || "N/A"}/10</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-zinc-900 shrink-0">
                  See more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Separator className="my-1 bg-zinc-200" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
