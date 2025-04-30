// components/UserAvatar.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserAvatarProps {
  name: string;
  imageUrl: URL;
  title: string;
}

function UserAvatar({ name, imageUrl, title }: UserAvatarProps) {
  const [finished, setFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleStoryClick = () => {
    console.log(`Navigating to story for ${title}`);
  };

  return (
    <Link href={`/stories/${title}`} onClick={handleStoryClick}>
      <div className="flex flex-col items-center">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={String(imageUrl)}
            alt={name}
            className="object-cover"
          />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold truncate w-full text-center">
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
