import { User } from "@/app/types";

export async function StoryPreview({ user }: { user: User }) {
  return <p>{user.title}</p>;
}
