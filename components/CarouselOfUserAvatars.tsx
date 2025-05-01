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

export interface AvatarData {
  id: number;
  name: string;
  title: string;
  article: string;
  avatarImageLink: string;
}

interface CarouselOfUserAvatarsProps {
  avatars: AvatarData[];
}

function CarouselOfUserAvatars({ avatars }: CarouselOfUserAvatarsProps) {
  const carouselOptions: EmblaOptionsType = {
    align: "start",
    slidesToScroll: 4,
    containScroll: "trimSnaps",
  };

  return (
    <Carousel opts={carouselOptions} className="p-8">
      <CarouselContent>
        {avatars.map((avatar) => (
          <CarouselItem key={avatar.id} className="flex-none w-30 !pl-2 pr-2">
            <UserAvatar id={avatar.id} />
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
