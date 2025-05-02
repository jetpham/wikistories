"use client";

import { Story } from "./Story";
import { useUsersStore } from "./UsersStoreProvider";

export function StoryWrapper({ title }: { title: string }) {
  const { users, viewStory } = useUsersStore((state) => state);

  return <Story title={title} users={users} viewStory={viewStory} />;
}
