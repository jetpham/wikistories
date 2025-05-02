"use state";
import { StoryWrapper } from "@/components/StoryWrapper";
import { X } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  return (
    <div className="bg-black/70 h-full w-full flex items-center justify-center">
      <StoryWrapper title={title} />
      <Link className="absolute top-4 right-4 cursor-pointer " href="/">
        <X color="#ffffff" className="size-10" />
      </Link>
    </div>
  );
}
