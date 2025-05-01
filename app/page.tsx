import { AvatarData } from "@/components/CarouselOfUserAvatars";
import { getUsers } from "./api/getUsers";
import AvatarCarouselWrapper from "@/components/avatar-carousel-wrapper";

export default async function Home() {
  const avatars: AvatarData[] = await getUsers();

  return <AvatarCarouselWrapper avatars={avatars} />;
}
