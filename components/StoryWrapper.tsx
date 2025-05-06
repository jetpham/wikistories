"use client";

import { Story } from "./Story";
import { useUsersStore } from "./UsersStoreProvider";

export function StoryWrapper({
  title,
  storyDirectly,
}: {
  title: string;
  storyDirectly: boolean;
}) {
  const { users, viewStory } = useUsersStore((state) => state);

  return <Story title={title} users={users} viewStory={viewStory} storyDirectly={storyDirectly}/>;
}
