import { Modal } from "./modal";
import { StoryWrapper } from "@/components/StoryWrapper";

export default async function StoryModal({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;

  console.log("rendering modal");
  return (
    <Modal>
      <StoryWrapper title={title} />
    </Modal>
  );
}
