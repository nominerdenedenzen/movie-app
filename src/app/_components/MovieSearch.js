"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setIsOpen(false);
        setResults([]);
        return;
      }

      try {
        const endpoint = `https://api.themoviedb.org/3/search/movie?query=${
          query
        }&page=1`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc4MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        });

        const data = await response.json;
        setResults(data.results.slice(0, 5));
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSearch();
  }, [query]);

  return (<div className="relative w-80">
    <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-zinc-400"/>
        <input/>
    </div>
  </div>);
};

export default MovieSearch;
