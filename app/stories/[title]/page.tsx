import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  return (
    <AspectRatio ratio={220 / 390}>
      <Image></Image>
    </AspectRatio>
  );
}
