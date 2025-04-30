import { Story } from "@/components/Story";
import { Modal } from "./modal";
import { getStoriesForUser } from "@/app/api/getStoriesForUser";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;
  const stories = await getStoriesForUser(title);
  return (
    <Modal>
      <Story stories={stories} />
    </Modal>
  );
}
