/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "@/app/types";
import { UserAvatarImageColored } from "./UserAvatar";
import { redirect } from "next/navigation";

export function StoryPreview({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <button
      className={`aspect-9/16 min-h-1/3 max-h-1/3 overflow-hidden relative ${className}`}
      onClick={() => redirect(`/stories/${user.title}`)}
    >
      <img
        src={user.stories[0].src}
        alt={user.stories[0].alt}
        className="object-fill w-full h-max-full aspect-9/16"
      />

      <div className="place-self-center ">
        <UserAvatarImageColored user={user} />
      </div>
    </button>
  );
}
