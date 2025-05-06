import { Modal } from "./modal";
import { StoryWrapper } from "@/components/StoryWrapper";

export default async function StoryModal({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;

  return (
    <Modal>
      <StoryWrapper title={title} storyDirectly={false} />
    </Modal>
  );
}
