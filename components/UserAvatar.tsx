// components/UserAvatar.tsx
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { UserWithStories } from "./avatar-carousel-wrapper";

function UserAvatar({ id }: { id: number }) {
  const [finished, setFinished] = useState<boolean>(false);
  const [, setProgress] = useState<number>(0);
  const [user, setUser] = useState<UserWithStories | null>(null);

  React.useEffect(() => {
    const storedData = sessionStorage.getItem(String(id));
    if (storedData) {
      const parsedUser = JSON.parse(storedData) as UserWithStories;
      setUser(parsedUser);
      setFinished(parsedUser.completedStories === parsedUser.totalStories);
      setProgress(parsedUser.completedStories);
    }
  }, [id]);

  if (!user) {
    return null;
  }

  const handleStoryClick = () => {
    console.log(`Navigating to story for ${user.title}`);
  };

  return (
    <Link href={`/stories/${user.title}`} onClick={handleStoryClick}>
      <div className="flex flex-col items-center ">
        {!finished ? (
          <div className="h-20 w-20 bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full flex items-center justify-center">
            <Avatar className="h-19/20 w-19/20 border-1 border-white">
              <AvatarImage
                src={user.avatarImageLink}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="h-20 w-20 bg-[#363636]  rounded-full flex items-center">
            <Avatar className="h-19/20 w-19/20 border-1 border-white">
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
