import { getStoriesForUser } from "@/app/api/getStoriesForUser";
import { Story } from "@/components/Story";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const stories = await getStoriesForUser(title);
  return <div className="bg-black/70 h-full w-full flex items-center justify-center"><Story stories={stories} /></div>;
}
