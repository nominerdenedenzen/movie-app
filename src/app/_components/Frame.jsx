import { Button } from "@base-ui/react";
import { ArrowRight } from "lucide-react";

export const Frame = ({ categoryName }) => {
  return (
    <>
      <div className="flex justify-between mt-20">
        <h3 className="font-semibold text-[24px]">{categoryName}</h3>
        <Button className="font-medium text-[14px] py-2 px-4 inline-flex items-center gap-2">
          See more <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-8"></div>
    </>
  );
};
