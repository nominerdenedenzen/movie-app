import { MovieItems } from "../../_components";
import { Button } from "@base-ui/react";
import { ArrowRight } from "lucide-react";

export const MoreLike = ({ similarMovies }) => {
  const movies = similarMovies?.results;
  console.log("SIMILAR", movies);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h3 className="font-semibold text-[24px]">More like this</h3>
        <Button className="py-2 px-4 font-medium text-[14px] flex gap-1 items-center">
          See More
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <MovieItems movies={movies?.slice(0, 5)} />
    </div>
  );
};
