import { User } from "./types";
import { createStore } from "zustand/vanilla";

export type UsersState = {
  users: User[];
};

export type UsersActions = {
  viewStory: (userTitle: string) => void;
};

export type UsersStore = UsersState & UsersActions;

export const defaultInitState: UsersState = {
  users: [],
};

export const createUsersStore = (initState: UsersState = defaultInitState) => {
  return createStore<UsersStore>()((set) => ({
    ...initState,
    viewStory: (userTitle) =>
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.title === userTitle
            ? {
                ...user,
                completedStories:
                  user.completedStories < user.stories.length
                    ? (user.completedStories || 0) + 1
                    : user.completedStories,
              }
            : user,
        );
        return { users: updatedUsers };
      }),
  }));
};
