"use client";
import { User } from "@/app/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/storyCarousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect } from "react";

export function Story({
  users,
  title,
  viewStory,
}: {
  users: User[];
  title: string;
  viewStory: (userId: number) => void;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const currentUser = users.find((user) => user.title === title);

  const nextUser = currentUser
    ? users.find((user) => user.id === currentUser.id + 1)
    : null;
  const prevUser = currentUser
    ? users.find((user) => user.id === currentUser.id - 1)
    : null;

  useEffect(() => {
    if (
      currentUser &&
      currentUser.completedStories < currentUser.stories.length
    ) {
      viewStory(currentUser.id);
    }
  }, [currentUser, viewStory]);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <Carousel
      opts={{
        duration: 0,
        watchDrag: false,
        startIndex:
          currentUser.completedStories === currentUser.stories.length
            ? 0
            : currentUser.completedStories - 1,
      }}
      className=" h-4/5 bg-white aspect-9/16 content-center"
      // plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      userId={currentUser.id}
    >
      <CarouselContent>
        {currentUser.stories.map((img, index) => (
          <CarouselItem key={index} className="content-center">
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-full w-full object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious prevUser={prevUser} />
      <CarouselNext
        nextUser={nextUser ?? null}
        currentUser={currentUser}
        viewStory={viewStory}
      />
    </Carousel>
  );
}
