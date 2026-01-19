import {
  selectActiveFriends,
  useFriendsStore,
} from "../../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";
import styles from "./FriendsSelector.module.scss";
import { Checkbox, Flex, Text } from "@mantine/core";
import { type PaymentFriend } from "../../../state/new-payment-store.ts";

type FriendsSelectorProps = {
  selectedFriends: PaymentFriend[];
  addFriend: (friendId: number) => void;
  removeFriend: (friendId: number) => void;
};

export const FriendsSelector = ({
  selectedFriends,
  addFriend,
  removeFriend,
}: FriendsSelectorProps) => {
  const allFriends = useFriendsStore(useShallow(selectActiveFriends));

  const toggleFriend = (friendId: number, newState: boolean) => {
    if (newState) {
      addFriend(friendId);
    } else {
      removeFriend(friendId);
    }
  };

  return (
    <Flex direction="column-reverse" justify="stretch">
      {allFriends.map((friend, index) => {
        const isSelected = !!selectedFriends.find(
          (f) => f.friendId === friend.id,
        );
        return (
          <Checkbox.Card
            key={index}
            checked={isSelected}
            onClick={() => toggleFriend(friend.id, !isSelected)}
            className={styles.checkboxCard}
          >
            <Checkbox.Indicator />
            <Text>{friend.name}</Text>
          </Checkbox.Card>
        );
      })}
    </Flex>
  );
};
