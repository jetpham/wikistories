// components/CarouselOfUserAvatars.tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UserAvatar from "./UserAvatar";
import type { EmblaOptionsType } from "embla-carousel";
import { User } from "@/app/types";

function CarouselOfUserAvatars({ users }: { users: User[] }) {
  const carouselOptions: EmblaOptionsType = {
    align: "start",
    slidesToScroll: 4,
    containScroll: "trimSnaps",
  };

  return (
    <Carousel opts={carouselOptions} className="p-8">
      <CarouselContent>
        {users.map((user) => (
          <CarouselItem key={user.id} className="flex-none w-30 !pl-2 pr-2">
            <UserAvatar user={user} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4 p-4">
        <CarouselPrevious className="relative mr-2" />
        <CarouselNext className="relative ml-2" />
      </div>
    </Carousel>
  );
}
export default CarouselOfUserAvatars;
