import CarouselOfUserAvatars, * as CarouselOfUserAvatars_1 from "@/components/CarouselOfUserAvatars";
import { Suspense } from "react";
import { GET } from "./api/users/route";

export default async function Home() {
  const response = await GET();
  const data = await response.json();
  const users: CarouselOfUserAvatars_1.AvatarData[] =
    data as CarouselOfUserAvatars_1.AvatarData[];
  return (
    <Suspense>
      <CarouselOfUserAvatars avatars={users} />
    </Suspense>
  );
}
