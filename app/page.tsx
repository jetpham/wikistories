import CarouselOfUserAvatars, {
  AvatarData,
} from "@/components/CarouselOfUserAvatars";
import { getUsers } from "./api/getUsers";

export default async function Home() {
  const users: AvatarData[] = await getUsers();
  return <CarouselOfUserAvatars avatars={users} />;
}
