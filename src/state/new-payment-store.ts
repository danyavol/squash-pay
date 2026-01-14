import { create } from "zustand";
import { persist } from "zustand/middleware";

type PaymentFriend = {
  friendId: number;
  multisportsNumber: number;
};

export type NewPaymentStore = {
  courtPrice: number;
  courtsNumber: number;
  multisportDiscount: number;
  duration: string;
  friends: PaymentFriend[];
  resetValues(): void;
  removeFriend(friendId: number): void;
  addFriend(friend: PaymentFriend): void;
  setFriend(friend: PaymentFriend): void;
};

export const durationPresets = [
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
];

export const defaultNewPaymentValues = {
  courtPrice: 90,
  courtsNumber: 1,
  multisportDiscount: 15,
  duration: durationPresets[1],
  friends: [],
};

export const maxMultisports = 4;

export const useNewPaymentStore = create<NewPaymentStore>()(
  persist(
    (set) => ({
      ...defaultNewPaymentValues,
      resetValues: () => {
        set({ ...defaultNewPaymentValues });
      },
      removeFriend: (friendId) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.friendId !== friendId),
        }));
      },
      addFriend: (friend) => {
        set((state) => ({
          friends: [...state.friends, friend],
        }));
      },
      setFriend: (friend: PaymentFriend) => {
        set((state) => ({
          friends: state.friends.reduce((acc, curr) => {
            if (curr.friendId === friend.friendId) {
              acc.push(friend);
            } else {
              acc.push(curr);
            }
            return acc;
          }, [] as PaymentFriend[]),
        }));
      },
    }),
    {
      name: "new-payment-storage",
    },
  ),
);
