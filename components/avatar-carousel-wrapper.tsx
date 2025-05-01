"use client";

import { useEffect } from "react";
import CarouselOfUserAvatars, { AvatarData } from "./CarouselOfUserAvatars";
import { getStoriesForUser } from "@/app/api/getStoriesForUser";

interface AvatarCarouselWrapperProps {
  avatars: AvatarData[];
}
export interface UserWithStories extends AvatarData {
  completedStories: number;
  totalStories: number;
  stories: {
    src: string;
    alt: string;
  }[];
}

export default function AvatarCarouselWrapper({
  avatars,
}: AvatarCarouselWrapperProps) {
  useEffect(() => {
    avatars.forEach(async (avatar) => {
      // TODO: This has a bug if the list of avatars changes from wikipedia, it'll conflict with the current list and not update it. This is already a fun thing to make it from "live" data, but I won't push it to perfection.
      if (!sessionStorage.getItem(String(avatar.id))) {
        const story = await getStoriesForUser(avatar.title);
        const avatarWithStories: UserWithStories = {
          ...avatar,
          completedStories: 0,
          totalStories: story.length,
          stories: story,
        };

        sessionStorage.setItem(
          String(avatar.id),
          JSON.stringify(avatarWithStories)
        );
        sessionStorage.setItem(avatar.title, JSON.stringify(avatar.id));
      }
    });
  }, [avatars]);

  return <CarouselOfUserAvatars avatars={avatars} />;
}
