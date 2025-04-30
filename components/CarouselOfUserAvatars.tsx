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
  id: string;
  name: string;
  title: string;
  article: URL;
  avatarImageLink: URL;
}

interface CarouselOfUserAvatarsProps {
  avatars: AvatarData[];
}

function CarouselOfUserAvatars({ avatars }: CarouselOfUserAvatarsProps) {
  const carouselOptions: EmblaOptionsType = {
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  };

  return (
    <Carousel opts={carouselOptions} className="w-full">
      <CarouselContent>
        {avatars.map((avatar) => (
          <CarouselItem key={avatar.id} className="flex-none">
            <UserAvatar
              name={avatar.name}
              imageUrl={avatar.avatarImageLink}
              title={avatar.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4 p-4">
        <CarouselPrevious className="relative static mr-2" />
        <CarouselNext className="relative static ml-2" />
      </div>
    </Carousel>
  );
}
export default CarouselOfUserAvatars;
