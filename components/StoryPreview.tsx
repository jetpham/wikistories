import Image from "next/image";
import { AvatarData } from "./CarouselOfUserAvatars";

export async function StoryPreview(user: AvatarData) {
  return <Image src={user.avatarImageLink} alt={"A picture of " + user.name} />;
}
