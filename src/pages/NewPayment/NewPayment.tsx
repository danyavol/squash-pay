import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Group,
  Text,
  Stack,
  Accordion,
  Title,
  Table,
  Select,
} from "@mantine/core";
import { useMemo } from "react";
import {
  selectFriendsMap,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";
import { UserRoundPlus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import styles from "./NewPayment.module.scss";
import { NumberIncrementor } from "../../components/NumberIncrementor/NumberIncrementor.tsx";
import { FriendsSelector } from "../../components/FriendsSelector/FriendsSelector.tsx";
import {
  durationPresets,
  maxMultisports,
  type PaymentData,
  useNewPaymentStore,
} from "../../state/new-payment-store.ts";
import { getDurationInHours } from "../../services/duration.service.ts";
import {
  splitPayment,
  getMessageForSharing,
} from "../../services/split-payment.service.ts";
import { isMobileDevice } from "../../services/is-mobile-device.service.ts";
import { notifications } from "@mantine/notifications";

export const NewPayment = () => {
  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));

  const {
    courtsNumber,
    courtPrice,
    multisportDiscount,
    duration,
    friends: selectedFriends,
    setFriend,
  } = useNewPaymentStore();

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

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
    useNewPaymentStore.setState((state) => ({
      courtsNumber: Math.min((state.courtsNumber ?? 0) + 1, 99),
    }));
  };

  const decreaseCourtsNumber = () => {
    useNewPaymentStore.setState((state) => ({
      courtsNumber: Math.max((state.courtsNumber ?? 0) - 1, 0),
    }));
  };

  function setValue<T extends keyof PaymentData>(
    key: T,
    value: PaymentData[T],
  ) {
    useNewPaymentStore.setState({ [key]: value });
  }

  const onSubmit = () => {
    const msg = getMessageForSharing(splitResults, friendsMap);

    if (isMobileDevice) {
      navigator
        .share({
          text: msg,
        })
        .then(() => afterSave("Payment saved successfully!"))
        .catch((e) => failedToSave(e, "Failed to share!"));
    } else {
      navigator.clipboard
        .writeText(msg)
        .then(() => afterSave("Payment saved and copied to clipboard!"))
        .catch((e) => failedToSave(e, "Failed to copy to clipboard!"));
    }
  };

  const afterSave = (message: string) => {
    notifications.show({
      message,
      color: "green",
    });
  };

  const failedToSave = (e: Error, title: string) => {
    notifications.show({
      title,
      message: `${e?.name ? e.name + ": " : ""}${e?.message}`,
      color: "red",
      autoClose: false,
    });
  };

  return (
    <>
      <Flex direction="column" gap="lg" align="stretch">
        <Title order={2}>New payment</Title>
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
              onChange={(value) => value && setValue("duration", value)}
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
                    decrease={() =>
                      setFriend({
                        friendId,
                        multisportsNumber: Math.max(multisportsNumber - 1, 0),
                      })
                    }
                    increase={() =>
                      setFriend({
                        friendId,
                        multisportsNumber: Math.min(
                          multisportsNumber + 1,
                          maxMultisports,
                        ),
                      })
                    }
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
                Advanced options
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Group gap="sm" grow align="start">
                <NumberInput
                  label="Price per court"
                  decimalScale={2}
                  allowNegative={false}
                  rightSection={"zł"}
                  value={courtPrice}
                  onChange={(value) =>
                    setValue(
                      "courtPrice",
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
                    setValue(
                      "multisportDiscount",
                      typeof value === "string" ? 0 : value,
                    )
                  }
                />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Flex justify="end">
          <Button onClick={onSubmit}>
            {isMobileDevice ? "Save & share" : "Save & copy"}
          </Button>
        </Flex>
      </Flex>

      <Modal
        opened={modalOpened}
        onClose={closeModal}
        centered
        title={<Title order={4}>Select who is playing squash</Title>}
        classNames={{ body: styles.modalBody }}
      >
        <FriendsSelector />
      </Modal>
    </>
  );
};
