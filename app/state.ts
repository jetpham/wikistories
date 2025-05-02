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
        const currentUser = state.users.find(
          (user) => user.title === userTitle,
        );
        if (currentUser) {
          console.log(currentUser.title);
          console.log(
            currentUser.completedStories + "/" + currentUser.stories.length,
          );
        }

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
        const updatedCurrentUser = updatedUsers.find(
          (user) => user.title === userTitle,
        );
        if (updatedCurrentUser) {
          console.log(
            updatedCurrentUser.completedStories +
              "/" +
              updatedCurrentUser.stories.length,
          );
        }
        return { users: updatedUsers };
      }),
  }));
};
