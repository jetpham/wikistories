"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/storyCarousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useState } from "react";
import { UserWithStories } from "./avatar-carousel-wrapper";

export function Story({ title }: { title: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const [finished, setFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [user, setUser] = useState<UserWithStories | null>(null);

  React.useEffect(() => {
    const key = sessionStorage.getItem(title);
    const storedData = key ? sessionStorage.getItem(key) : null;
    if (storedData) {
      const parsedUser = JSON.parse(storedData) as UserWithStories;
      setUser(parsedUser);
      setFinished(parsedUser.completedStories === parsedUser.totalStories);
      setProgress(parsedUser.completedStories);
    }
  }, [title]);

  if (!user) {
    return null;
  }

  const stories = user.stories;
  return (
    <Carousel
      opts={{
        align: () => (finished ? 0 : progress),
        duration: 0,
        watchDrag: false,
      }}
      className=" h-4/5 bg-white aspect-9/16 content-center"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      userId={user.id}
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
