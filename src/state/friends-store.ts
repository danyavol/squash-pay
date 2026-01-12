import { create } from "zustand";
import { persist } from "zustand/middleware";

type Friend = {
  id: number;
  isDeleted: boolean;
} & FriendCreationAttributes;

type FriendCreationAttributes = {
  name: string;
};

type FriendsStore = {
  friends: Friend[];
  addFriend: (friend: FriendCreationAttributes) => void;
  deleteFriend: (id: number) => void;
  updateFriend: (
    id: number,
    partialData: Partial<FriendCreationAttributes>,
  ) => void;
};

export const useFriendsStore = create<FriendsStore>()(
  persist(
    (set) => ({
      friends: [],
      addFriend: (attributes) => {
        set((state) => {
          const lastId =
            state.friends.length > 0
              ? state.friends[state.friends.length - 1].id
              : 0;

          return {
            friends: [
              ...state.friends,
              { ...attributes, id: lastId + 1, isDeleted: false },
            ],
          };
        });
      },
      deleteFriend: (id) => {
        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === id ? { ...f, isDeleted: true } : f,
          ),
        }));
      },
      updateFriend: (id, data) => {
        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === id ? { ...f, ...data } : f,
          ),
        }));
      },
    }),
    {
      name: "friends-storage",
    },
  ),
);

/**
 * Selectors
 */

export const selectActiveFriends = (state: FriendsStore) =>
  state.friends.filter((f) => !f.isDeleted);

export const selectFriendsMap = (state: FriendsStore) => {
  return state.friends.reduce(
    (acc, friend) => {
      acc[friend.id] = friend;
      return acc;
    },
    {} as Record<number, Friend>,
  );
};
