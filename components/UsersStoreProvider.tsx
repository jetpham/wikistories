// src/providers/users-store-provider.tsx
"use client";

import { createUsersStore, UsersStore } from "@/app/state";
import { User } from "@/app/types";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type UsersStoreApi = ReturnType<typeof createUsersStore>;

export const UsersStoreContext = createContext<UsersStoreApi | undefined>(
  undefined
);

export interface UsersStoreProviderProps {
  users: User[];
  children: ReactNode;
}

export const UsersStoreProvider = ({ children, users }: UsersStoreProviderProps) => {
  const storeRef = useRef<UsersStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createUsersStore({ users });
  }

  return (
    <UsersStoreContext.Provider value={storeRef.current}>
      {children}
    </UsersStoreContext.Provider>
  );
};

export const useUsersStore = <T,>(selector: (store: UsersStore) => T): T => {
  const usersStoreContext = useContext(UsersStoreContext);

  if (!usersStoreContext) {
    throw new Error(`useUsersStore must be used within UsersStoreProvider`);
  }

  return useStore(usersStoreContext, selector);
};
