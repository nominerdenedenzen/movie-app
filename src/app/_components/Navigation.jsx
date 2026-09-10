"use client";

import { Button, Input } from "@base-ui/react";
import { ChevronDown, ChevronRight, MoonIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu";
import { Badge } from "../../../@/components/ui/badge";
import { GENRE_MAP } from "@/lib/genres";

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-20 py-2.5">
        <Image src="/Logo.png" alt="Logo" width={92} height={20} />

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline">
                  <ChevronDown className="h-4 w-4 opacity-50 text-[#18181B]" />
                  Genre
                </Button>
              }
              className="flex items-center gap-2 rounded-md border border-[#E4E4E7] py-2 px-4 text-sm font-medium text-[#18181B] hover:bg-slate-50"
            ></DropdownMenuTrigger>

            <DropdownMenuContent className="w-130 p-4">
              <h3 className="font-semibold text-[24px]">Genre</h3>
              <p className="font-normal text-[16px]">
                See lists of movies by genre
              </p>

              <DropdownMenuSeparator className="my-4" />
              <div className="grid grid-cols-4 gap-2 pt-2">
                {Object.entries(GENRE_MAP).map(([name, id]) => (
                  <div key={id} className="p-0">
                    <Link href={`/genre/${id}`}>
                      <Badge
                        variant="secondary"
                        className="flex items-center justify-between py-1.5 px-3 gap-2 text-[12px] w-full bg-white border-[#E4E4E7] text-black hover:bg-zinc-100 cursor-pointer"
                      >
                        {name}
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      </Badge>
                    </Link>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />

            <Input
              placeholder="Search..."
              type="search"
              className="rounded-md border border-[#E4E4E7] pl-9 pr-3 py-2 text-sm placeholder-[#E4E4E7] outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md h-9 w-9 border border-[#E4E4E7]"
        >
          <MoonIcon className="h-4 w-4 text-black dark:text-white" />
        </button>
      </div>
    </div>
  );
};
