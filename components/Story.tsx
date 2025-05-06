/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "@/app/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/storyCarousel";
import React, { useCallback, useEffect, useState } from "react";
import { UserAvatarImageColored } from "./UserAvatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Ellipsis, ExternalLink, Pause, Play } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";

export function Story({
  users,
  title,
  viewStory,
  storyDirectly,
}: {
  users: User[];
  title: string;
  viewStory: (userTitle: string) => void;
  storyDirectly: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [message, setMessage] = useState("");

  const currentUser = users.find((user) => user.title === title);

  const nextUser = currentUser
    ? users.find((user) => user.id === currentUser.id + 1)
    : null;

  const prevUser = currentUser
    ? users.find((user) => user.id === currentUser.id - 1)
    : null;

  const [currentIndex, setCurrentIndex] = useState(
    (currentUser?.completedStories ?? 0) < (currentUser?.stories?.length ?? 0)
      ? currentUser?.completedStories ?? 0
      : 0
  );

  useEffect(() => {
    viewStory(title);
  }, [title, viewStory]);

  const handlePrev = useCallback(
    (canScrollPrev: boolean) => {
      if (!canScrollPrev && prevUser) {
        redirect(`/stories/${prevUser.title}`);
      } else {
        setCurrentIndex(() => {
          const prevIndex = currentIndex - 1;
          return prevIndex >= 0 ? prevIndex : currentIndex;
        });
      }
    },
    [currentIndex, prevUser]
  );

  const handleNext = useCallback(
    (canScrollNext: boolean) => {
      if (currentUser && currentIndex === currentUser.completedStories - 1) {
        viewStory(currentUser.title);
      }

      if (!canScrollNext) {
        if (nextUser) {
          redirect(`/stories/${nextUser.title}`);
        } else if (storyDirectly) {
          redirect(`/`);
        }
      } else {
        setCurrentIndex(() => {
          const nextIndex = currentIndex + 1;
          return currentUser && nextIndex < currentUser.stories.length
            ? nextIndex
            : currentIndex;
        });
      }
    },
    [currentIndex, currentUser, nextUser, storyDirectly, viewStory]
  );

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleSend = () => {
    setMessage("");
  };

  return (
    <Carousel
      opts={{
        duration: 0,
        watchDrag: false,
        startIndex: currentIndex,
      }}
      className="max-h-4/5 min-h-4/5 bg-white aspect-9/16 content-center"
      userId={currentUser.id}
    >
      <div className="absolute top-0 left-0 flex w-full h-full z-50">
        <div className="absolute top-0 w-full bg-linear-to-t from-transparent to-black/60 h-1/5">
          <div className="absolute top-0 items-center justify-between p-2 w-full ">
            <div className="flex w-full pb-1 content-center">
              {currentUser.stories.map((_, index) => {
                return (
                  <Progress
                    key={index}
                    value={
                      index < currentIndex ? 100 : index > currentIndex ? 0 : 50
                    }
                    className={`flex-1 ${
                      index === currentIndex ? "h-1.5" : ""
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8">
                  <UserAvatarImageColored user={currentUser} />
                </div>
                <Link
                  href={currentUser.article}
                  className="text-sm font-semibold text-white hover:text-gray-200 hover:underline text-ellipsis overflow-hidden whitespace-nowrap max-w-[130px] flex flex=row"
                >
                  {currentUser.name}
                  <ExternalLink className="pl-1 size-4" />
                </Link>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => {
                    setIsPlaying((prev) => !prev);
                  }}
                >
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                <Button variant="ghost" className="text-white">
                  <Ellipsis />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-linear-to-b from-transparent to-black/60 h-1/5">
          <div className="absolute bottom-0 flex w-full items-center space-x-2 p-2">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder={`Reply to ${currentUser.name}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                className="w-full pr-16 text-white rounded-full placeholder:text-rgb(217,217,217)"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={handleSend}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-14 text-white "
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CarouselContent>
        {currentUser.stories.map((img, index) => (
          <CarouselItem key={index} className="relative content-center">
            <img
              src={img.src}
              alt={img.alt}
              className="object-contain w-full h-max-full aspect-9/16"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious prevUser={prevUser ?? null} goPrev={handlePrev} />
      <CarouselNext
        nextUser={nextUser ?? null}
        goNext={handleNext}
        storyDirectly={storyDirectly}
      />
    </Carousel>
  );
}
