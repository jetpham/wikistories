"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/storyCarousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function Story({
  stories,
}: {
  stories: { src: string; alt: string }[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel
      opts={{
        align: "start",
        duration: 0,
        watchDrag: false,
      }}
      className=" h-4/5 bg-white aspect-9/16 content-center"
      // plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {stories.map((img, index) => (
          <CarouselItem key={index} className="content-center">
            <img
              src={img.src}
              alt={img.alt}
              className=" max-h-full w-full object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
