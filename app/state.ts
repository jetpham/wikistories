import { User } from "./types";
import { createStore } from 'zustand/vanilla'

export type UsersState = {
  users: User[]
}

export type UsersActions = {
  viewStory: (userId: number) => void
}

export type UsersStore = UsersState & UsersActions

export const defaultInitState: UsersState = {
  users: []
}

export const createUsersStore = (
  initState: UsersState = defaultInitState,
) => {
return createStore<UsersStore>()((set) => ({
  ...initState,
  viewStory: (userId) => set((state) => {
    // const currentUser = state.users.find((user) => user.id === userId)
    // if (currentUser){
    //   console.log(currentUser.title)
    //   console.log(currentUser.completedStories + "/" + currentUser.stories.length)
    // }

    const updatedUsers = state.users.map(user =>
      user.id === userId
        ? { ...user, completedStories: (user.completedStories || 0) + 1 }
        : user
    );
    // const updatedCurrentUser = updatedUsers.find((user) => user.id === userId)
    // if (updatedCurrentUser){
    //   console.log(updatedCurrentUser.completedStories + "/" + updatedCurrentUser.stories.length)
    // }
    return { users: updatedUsers };
  }),
}))
}
