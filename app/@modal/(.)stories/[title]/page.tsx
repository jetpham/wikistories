import { Story } from "@/components/Story";
import { Modal } from "./modal";

export default async function StoryModal({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;
  return (
    <Modal>
      <Story title={title} />
    </Modal>
  );
}
