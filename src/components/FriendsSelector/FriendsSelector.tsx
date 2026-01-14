import {
  selectActiveFriends,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";
import styles from "./FriendsSelector.module.scss";
import { Checkbox, Flex, Text } from "@mantine/core";
import { useNewPaymentStore } from "../../state/new-payment-store.ts";

export const FriendsSelector = () => {
  const allFriends = useFriendsStore(useShallow(selectActiveFriends));
  const selectedFriends = useNewPaymentStore(({ friends }) => friends);
  const removeFriend = useNewPaymentStore(({ removeFriend }) => removeFriend);
  const addFriend = useNewPaymentStore(({ addFriend }) => addFriend);

  const toggleFriend = (friendId: number, newState: boolean) => {
    if (newState) {
      addFriend({ friendId, multisportsNumber: 0 });
    } else {
      removeFriend(friendId);
    }
  };

  return (
    <Flex direction="column" justify="stretch">
      {allFriends.map((friend) => {
        const isSelected = !!selectedFriends.find(
          (f) => f.friendId === friend.id,
        );
        return (
          <Checkbox.Card
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
