import {
  selectActiveFriends,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";
import { ActionIcon, Button, Text, Flex, TextInput, Menu } from "@mantine/core";
import { Trash2, EllipsisVertical, Plus } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./Friends.module.scss";

export const Friends = () => {
  const friends = useFriendsStore(useShallow(selectActiveFriends));
  const updateFriend = useFriendsStore((state) => state.updateFriend);
  const deleteFriend = useFriendsStore((state) => state.deleteFriend);
  const addFriend = useFriendsStore((state) => state.addFriend);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");

  const onAddFriend = () => {
    addFriend({ name: name.trim() });
    setName("");
  };

  return (
    <Flex direction="column" gap="md">
      <Flex gap="sm">
        <TextInput
          className={styles.friendName}
          ref={nameInputRef}
          value={name}
          placeholder="New friend name"
          onChange={(event) => setName(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && name.trim()) {
              onAddFriend();
            }
          }}
        />
        <Button
          onClick={() => {
            if (name.trim()) {
              onAddFriend();
            } else {
              nameInputRef.current?.focus?.();
            }
          }}
          leftSection={<Plus />}
        >
          Add
        </Button>
      </Flex>

      <Flex direction="column-reverse" gap="sm">
        {friends.map((friend) => (
          <Flex key={friend.id} gap="xs" align="center">
            <TextInput
              className={styles.friendName}
              value={friend.name}
              variant="filled"
              onChange={(event) =>
                updateFriend(friend.id, { name: event.currentTarget.value })
              }
            />

            <Menu shadow="md" width={120} withArrow>
              <Menu.Target>
                <ActionIcon variant="subtle" size="lg" color="gray">
                  <EllipsisVertical width="60%" height="60%" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  variant="subtle"
                  color="red"
                  leftSection={<Trash2 width={14} height={14} />}
                  onClick={() => deleteFriend(friend.id)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ))}
      </Flex>

      {friends.length === 0 && (
        <Text c="dimmed" ta="center">
          You don't have any friends, yet 😢
        </Text>
      )}
    </Flex>
  );
};
