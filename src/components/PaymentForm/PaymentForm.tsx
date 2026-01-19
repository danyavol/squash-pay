import {
  durationPresets,
  maxMultisports,
  type PaymentData,
  type PaymentFriend,
} from "../../state/new-payment-store.ts";
import {
  Accordion,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { NumberIncrementor } from "../NumberIncrementor/NumberIncrementor.tsx";
import styles from "./PaymentForm.module.scss";
import { UserRoundPlus } from "lucide-react";
import { DatePickerInput } from "@mantine/dates";
import { FriendsSelector } from "./FriendsSelector/FriendsSelector.tsx";
import { useMemo } from "react";
import { getDurationInHours } from "../../services/duration.service.ts";
import { splitPayment } from "../../services/split-payment.service.ts";
import {
  selectFriendsMap,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useDisclosure } from "@mantine/hooks";
import { useShallow } from "zustand/react/shallow";

type PaymentFormProps = {
  formValue: PaymentData;
  setFormValue: <T extends keyof PaymentData>(
    key: T,
    valueSetter: (current: PaymentData[T]) => PaymentData[T],
  ) => void;
};

export const PaymentForm = ({ formValue, setFormValue }: PaymentFormProps) => {
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));

  const {
    courtPrice,
    courtsNumber,
    duration,
    friends: selectedFriends,
    multisportDiscount,
    date,
  } = formValue;

  const durationInHours = useMemo(() => {
    return getDurationInHours(duration);
  }, [duration]);

  const priceWithoutDiscount = useMemo(() => {
    return courtPrice * courtsNumber * durationInHours;
  }, [courtPrice, courtsNumber, durationInHours]);

  const discountValue = useMemo(
    () =>
      selectedFriends.reduce((acc, f) => {
        return acc + f.multisportsNumber * multisportDiscount;
      }, 0),
    [selectedFriends, multisportDiscount],
  );

  const splitResults = useMemo(
    () =>
      splitPayment({
        courtsNumber,
        duration,
        friends: selectedFriends,
        courtPrice,
        multisportDiscount,
      }),
    [courtsNumber, duration, selectedFriends, courtPrice, multisportDiscount],
  );

  const increaseCourtsNumber = () => {
    setFormValue("courtsNumber", (currentCourts) =>
      Math.min((currentCourts ?? 0) + 1, 99),
    );
  };

  const decreaseCourtsNumber = () => {
    setFormValue("courtsNumber", (currentCourts) =>
      Math.max((currentCourts ?? 0) - 1, 0),
    );
  };

  const updateFriend = (
    friends: PaymentFriend[],
    updatedFriend: PaymentFriend,
  ): PaymentFriend[] => {
    return friends.reduce((acc, curr) => {
      if (curr.friendId === updatedFriend.friendId) {
        acc.push(updatedFriend);
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as PaymentFriend[]);
  };

  return (
    <>
      <Flex direction="column" gap="lg" align="stretch">
        <Stack gap="sm">
          <Group gap="sm" grow align="start">
            <NumberIncrementor
              value={courtsNumber}
              decrease={decreaseCourtsNumber}
              increase={increaseCourtsNumber}
              label="Courts"
            />

            <Select
              label="Duration"
              data={durationPresets}
              allowDeselect={false}
              value={duration}
              onChange={(value) =>
                value && setFormValue("duration", () => value)
              }
            />
          </Group>

          <Group gap="xs">
            <Text c="dimmed" size="sm">
              Price without discount:{" "}
            </Text>
            <Text size="sm">{priceWithoutDiscount} zł</Text>
          </Group>
        </Stack>

        <Table withRowBorders={false} className={styles.friendsTable}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={styles.indexHeader}>#</Table.Th>
              <Table.Th>Person</Table.Th>
              <Table.Th className={styles.multisportHeader}>
                Multisport
              </Table.Th>
              <Table.Th className={styles.priceHeader}>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {selectedFriends.map(({ friendId, multisportsNumber }, index) => (
              <Table.Tr key={friendId}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>
                  <Text>{friendsMap[friendId].name}</Text>
                </Table.Td>
                <Table.Td>
                  <NumberIncrementor
                    size="md"
                    value={multisportsNumber}
                    decrease={() => {
                      setFormValue("friends", (friends) =>
                        updateFriend(friends, {
                          friendId,
                          multisportsNumber: Math.max(multisportsNumber - 1, 0),
                        }),
                      );
                    }}
                    increase={() => {
                      setFormValue("friends", (friends) =>
                        updateFriend(friends, {
                          friendId,
                          multisportsNumber: Math.min(
                            multisportsNumber + 1,
                            maxMultisports,
                          ),
                        }),
                      );
                    }}
                  />
                </Table.Td>
                <Table.Td>
                  <Text>{splitResults[index].amount} zł</Text>
                </Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Button
                  variant="subtle"
                  size="sm"
                  leftSection={
                    <UserRoundPlus height="1.25rem" width="1.25rem" />
                  }
                  onClick={openModal}
                  fullWidth
                >
                  Select people
                </Button>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Text className={styles.totalPriceText}>Total price:</Text>
              </Table.Td>
              <Table.Td>
                <Text
                  size="xl"
                  fw="700"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red", deg: 90 }}
                >
                  {priceWithoutDiscount - discountValue} zł
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <Accordion
          variant="filled"
          chevronIconSize={14}
          classNames={{ control: styles.control }}
        >
          <Accordion.Item value="1">
            <Accordion.Control>
              <Text fw={500} size="sm" className={styles.advancedOptionsTitle}>
                Other options
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="sm">
                <DatePickerInput
                  label="Date"
                  placeholder="Select a date"
                  clearable={true}
                  value={date}
                  onChange={(value) => setFormValue("date", () => value)}
                />

                <Group gap="sm" grow align="start">
                  <NumberInput
                    label="Price per court"
                    decimalScale={2}
                    allowNegative={false}
                    rightSection={"zł"}
                    value={courtPrice}
                    onChange={(value) =>
                      setFormValue("courtPrice", () =>
                        typeof value === "string" ? 0 : value,
                      )
                    }
                  />
                  <NumberInput
                    label="Multisport discount"
                    decimalScale={2}
                    allowNegative={false}
                    rightSection={"zł"}
                    value={multisportDiscount}
                    onChange={(value) =>
                      setFormValue("multisportDiscount", () =>
                        typeof value === "string" ? 0 : value,
                      )
                    }
                  />
                </Group>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Flex>

      <Modal
        opened={modalOpened}
        onClose={closeModal}
        centered
        title="Select who is playing squash"
        classNames={{ body: styles.modalBody }}
      >
        <FriendsSelector
          selectedFriends={selectedFriends}
          addFriend={(friendId) => {
            setFormValue("friends", (friends) => [
              ...friends,
              { friendId, multisportsNumber: 0 },
            ]);
          }}
          removeFriend={(friendId) => {
            setFormValue("friends", (friends) =>
              friends.filter((f) => f.friendId !== friendId),
            );
          }}
        />
      </Modal>
    </>
  );
};
