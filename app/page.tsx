"use client";
import CarouselOfUserAvatars from "@/components/CarouselOfUserAvatars";
import { useUsersStore } from "@/components/UsersStoreProvider";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaWikipediaW } from "react-icons/fa";
export default function Home() {
  const { users } = useUsersStore((state) => state);

  return (
    <>
      <CarouselOfUserAvatars users={users} />
      <div className="flex justify-center items-center gap-4">
        <Link
          href={"https://github.com/jetpham/wikistories"}
          className={` ${buttonVariants({
            variant: "default",
          })} `}
        >
          <FaGithub />
          Go To The Repo
        </Link>
        <Link
          href={"https://en.wikipedia.org/wiki/Wikipedia:Top_25_Report"}
          className={` ${buttonVariants({
            variant: "outline",
          })} `}
        >
          <FaWikipediaW />
          Wikipedia Top 25
        </Link>
      </div>
    </>
  );
}
