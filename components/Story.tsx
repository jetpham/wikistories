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
import React, { useEffect, useRef, useState } from "react";
import { UserAvatar, UserAvatarImageColored } from "./UserAvatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Story({
  users,
  title,
  viewStory,
}: {
  users: User[];
  title: string;
  viewStory: (userTitle: string) => void;
}) {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true })
  );

  const [message, setMessage] = useState("");

  const currentUser = users.find((user) => user.title === title);

  useEffect(() => {
    viewStory(title);
  }, []);

  const nextUser = currentUser
    ? users.find((user) => user.id === currentUser.id + 1)
    : null;
  const prevUser = currentUser
    ? users.find((user) => user.id === currentUser.id - 1)
    : null;

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear the input field
  };

  return (
    <Carousel
      opts={{
        duration: 0,
        watchDrag: false,
      }}
      className=" h-4/5 bg-white aspect-9/16 content-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      userId={currentUser.id}
    >
      <div className="absolute top-0 left-0 flex w-full h-full z-50">
        <div className="absolute top-2 left-2 w-15 h-15">
          <UserAvatarImageColored user={currentUser} />
        </div>
        <div className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {currentUser.name}
        </div>
        <div className="absolute bottom-0 flex w-full items-center space-x-2 p-4 backdrop-blur-md">
          <Input
            type="message"
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="button" onClick={handleSend}>
            Subscribe
          </Button>
        </div>
      </div>
      <CarouselContent>
        {currentUser.stories.map((img, index) => (
          <CarouselItem key={index} className="relative content-center">
            <img src={img.src} alt={img.alt} className=" object-contain" />
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
