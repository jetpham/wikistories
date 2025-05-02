"use client";
import CarouselOfUserAvatars from "@/components/CarouselOfUserAvatars";
import { useUsersStore } from "@/components/UsersStoreProvider";

export default function Home() {
  const { users } = useUsersStore((state) => state);

  return <CarouselOfUserAvatars users={users} />;
}
