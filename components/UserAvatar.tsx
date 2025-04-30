// components/UserAvatar.tsx
"use client";

import * as React from "react";
// import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserAvatarProps {
  name: string;
  imageUrl: string;
  title: string;
}

function UserAvatar({ name, imageUrl, title }: UserAvatarProps) {
  // const [finished, setFinished] = useState<boolean>(false);
  const finished = false;
  // const [progress, setProgress] = useState<number>(0);

  const handleStoryClick = () => {
    console.log(`Navigating to story for ${title}`);
  };

  return (
    <Link href={`/stories/${title}`} onClick={handleStoryClick}>
      <div className="flex flex-col items-center ">
        {!finished ? (
          <div className="h-20 w-20 bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full content-center">
            <Avatar className="h-19/20 w-19/20 place-self-center border-1 border-white">
              <AvatarImage src={imageUrl} alt={name} className="object-cover" />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="h-20 w-20 bg-[#363636] rounded-full content-center">
            <Avatar className="h-19/20 w-19/20 place-self-center border-1 border-white">
              <AvatarImage src={imageUrl} alt={name} className="object-cover" />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <p className="text-sm font-semibold truncate w-full text-center pt-1">
          {name}
        </p>
        <p className="text-xs text-gray-500 truncate w-full text-center">
          {title}
        </p>
      </div>
    </Link>
  );
}

export default UserAvatar;
