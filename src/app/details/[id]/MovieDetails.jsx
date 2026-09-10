import { Separator } from "@/components/ui/separator";
import { Badge } from "../../_components/Badge";

export const MovieDetails = ({ creditData, movieDetail }) => {
  const director = creditData?.crew?.find(
    (person) => person.department === "Directing",
  );

  const writers = creditData?.crew
    ?.filter((person) => person.known_for_department === "Writing")
    ?.slice(0, 5)
    ?.map((person) => person.name)
    ?.join(" · ");

  const actors = creditData?.cast
    ?.filter((person) => person.known_for_department === "Acting")
    ?.slice(0, 5)
    ?.map((person) => person.name)
    ?.join(" · ");

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-wrap items-center gap-2">
        {movieDetail?.genres?.map((genre) => (
          <Badge key={genre.id} variant="secondary">
            {genre.name}
          </Badge>
        ))}
      </div>

      <p className="font-normal text-base leading-relaxed">
        {movieDetail.overview}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-12">
            <h1 className="font-bold text-base w-20">Director</h1>
            <p className="font-normal text-base">{director?.name}</p>
          </div>
          <Separator className="bg-[#E4E4E7]" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-12">
            <h1 className="font-bold text-base w-20">Writers</h1>
            <p className="font-normal text-base ">{writers}</p>
          </div>
          <Separator className="bg-[#E4E4E7]" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-12">
            <h1 className="font-bold text-base w-20 shrink-0">Stars</h1>
            <p className="font-normal text-base">{actors}</p>
          </div>
          <Separator className="bg-[#E4E4E7]" />
        </div>
      </div>
    </div>
  );
};
