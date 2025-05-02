// components/UserAvatar.tsx
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { User } from "@/app/types";

function UserAvatar({ user }: { user: User }) {
  return (
    <Link href={`/stories/${user.title}`}>
      <div className="flex flex-col items-center ">
        {!(user.stories.length == user.completedStories) ? (
          <div className="h-20 w-20 bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full flex items-center justify-center">
            <Avatar className="h-18/20 w-18/20 border-1 border-white bg-white">
              <AvatarImage
                src={user.avatarImageLink}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="h-20 w-20 bg-[#363636] rounded-full flex items-center justify-center">
            <Avatar className="h-18/20 w-18/20 border-1 border-white bg-white">
              <AvatarImage
                src={user.avatarImageLink}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <p className="text-sm font-semibold truncate w-full text-center pt-1">
          {user.name}
        </p>
        <p className="text-xs text-gray-500 truncate w-full text-center">
          {user.title}
        </p>
      </div>
    </Link>
  );
}

export default UserAvatar;
