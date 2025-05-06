"use client";
import CarouselOfUserAvatars from "@/components/CarouselOfUserAvatars";
import { useUsersStore } from "@/components/UsersStoreProvider";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaWikipediaW } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  const { users } = useUsersStore((state) => state);

  return (
    <>
      <Card className="flex place-content-center place-self-center mt-10 mb-5">
        <CardHeader className="text-2xl font-bold flex items-center">
          <span>WikiStories</span>
          <Link
            href={"https://github.com/jetpham/wikistories"}
            className={` ${buttonVariants({
              variant: "default",
            })}`}
          >
            <FaGithub />
            Go To The Repo
          </Link>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          View the{" "}
          <Link
            href={"https://en.wikipedia.org/wiki/Wikipedia:Top_25_Report"}
            className={` ${buttonVariants({
              variant: "outline",
            })} flex items-center gap-1`}
          >
            <FaWikipediaW />
            Wikipedia Top 25
          </Link>
          most viewed articles as Instagram stories
        </CardContent>
      </Card>
      <CarouselOfUserAvatars users={users} />
    </>
  );
}
