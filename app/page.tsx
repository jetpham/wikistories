import CarouselOfUserAvatars, {
  AvatarData,
} from "@/components/CarouselOfUserAvatars";
import { Suspense } from "react";
import { getUsers } from "./api/getUsers";

export default async function Home() {
  const users: AvatarData[] = await getUsers();
  return (
    <Suspense>
      <CarouselOfUserAvatars avatars={users} />
    </Suspense>
  );
}
