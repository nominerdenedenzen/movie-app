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
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { GENRE_MAP } from "@/lib/genres";
import MovieSearch from "./MovieSearch";

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="flex h-16 items-center justify-between px-20 py-2.5">
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" width={92} height={20} priority />
        </Link>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline">
                  <ChevronDown className="h-4 w-4 opacity-50 text-[#18181B]" />
                  Genre
                </Button>
              }
              className="flex items-center gap-2 rounded-md border border-[#E4E4E7] bg-white py-2 px-4 text-sm font-medium text-[#18181B] hover:bg-zinc-50 cursor-pointer"
            ></DropdownMenuTrigger>

            <DropdownMenuContent className="w-[520px] p-4 bg-white border border-zinc-200 shadow-lg">
              <h3 className="font-semibold text-[24px] text-zinc-900">Genre</h3>
              <p className="font-normal text-[16px] text-zinc-500">
                See lists of movies by genre
              </p>

              <DropdownMenuSeparator className="my-4 bg-zinc-200" />
              <div className="grid grid-cols-4 gap-2 pt-2">
                {Object.entries(GENRE_MAP).map(([name, id]) => (
                  <div key={id} className="p-0">
                    <Link href={`/genre/${id}`}>
                      <Badge
                        variant="secondary"
                        className="flex items-center justify-between py-1.5 px-3 gap-2 text-[12px] w-full bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-100 cursor-pointer shadow-none"
                      >
                        {name}
                        <ChevronRight className="h-3 w-3 opacity-50 text-zinc-500" />
                      </Badge>
                    </Link>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <MovieSearch/>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md h-9 w-9 border border-[#E4E4E7] bg-white cursor-pointer hover:bg-zinc-50"
        >
          <MoonIcon className="h-4 w-4 text-zinc-900" />
        </button>
      </div>
    </div>
  );
};