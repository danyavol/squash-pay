import { TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
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
} from "@mantine/core";
import type { PaymentForm } from "../../types/PaymentForm.type.ts";
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
  defaultNewPaymentValues,
  durationPresets,
  maxMultisports,
  useNewPaymentStore,
} from "../../state/new-payment-store.ts";

export const NewPayment = () => {
  const form = useForm<PaymentForm>({
    mode: "controlled",
    initialValues: {
      courtPrice: defaultNewPaymentValues.courtPrice,
      courtsNumber: defaultNewPaymentValues.courtsNumber,
      multisportDiscount: defaultNewPaymentValues.multisportDiscount,
      duration: defaultNewPaymentValues.duration,
      friends: defaultNewPaymentValues.friends,
    },
    validate: {
      duration: (value) =>
        durationPresets.includes(value) ? null : "Pick valid duration",
    },
  });

  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));
  const selectedFriends = useNewPaymentStore((state) => state.friends);
  const setFriend = useNewPaymentStore((state) => state.setFriend);

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const durationInHours = useMemo(() => {
    const isValid = !form.validateField("duration").hasError;

    const index = durationPresets.findIndex((v) => v === form.values.duration);

    if (!isValid || index < 0) return 0;

    return (index + 1) * 0.5;
  }, [form.values.duration]);

  const priceWithoutDiscount = useMemo(() => {
    return form.values.courtPrice * form.values.courtsNumber * durationInHours;
  }, [form.values.courtPrice, form.values.courtsNumber, durationInHours]);

  const discountValue = useMemo(
    () =>
      selectedFriends.reduce((acc, f) => {
        return acc + f.multisportsNumber * form.values.multisportDiscount;
      }, 0),
    [selectedFriends, form.values.multisportDiscount],
  );

  const increaseCourtsNumber = () => {
    form.setValues((values) => ({
      courtsNumber: Math.min((values.courtsNumber ?? 0) + 1, 99),
    }));
  };

  const decreaseCourtsNumber = () => {
    form.setValues((values) => ({
      courtsNumber: Math.max((values.courtsNumber ?? 0) - 1, 0),
    }));
  };

  const onSubmit = () => {
    form.validate();

    if (form.isValid()) {
      console.log(form.values);
    }
  };

  return (
    <>
      <Flex direction="column" gap="lg" align="stretch">
        <Title order={2}>New payment</Title>
        <Stack gap="sm">
          <Group gap="sm" grow align="start">
            <NumberInput
              label="Price per court"
              decimalScale={2}
              allowNegative={false}
              rightSection={"zł"}
              {...form.getInputProps("courtPrice")}
            />
            <NumberIncrementor
              value={form.values.courtsNumber}
              decrease={decreaseCourtsNumber}
              increase={increaseCourtsNumber}
              label="Courts"
            />

            <TimePicker
              label="Duration"
              withDropdown
              presets={durationPresets}
              {...form.getInputProps("duration")}
            />
          </Group>

          <Group gap="xs">
            <Text c="dimmed" size="sm">
              Price without discount:{" "}
            </Text>
            <Text size="sm">{priceWithoutDiscount} zł</Text>
          </Group>
        </Stack>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={styles.indexHeader}>#</Table.Th>
              <Table.Th>Person</Table.Th>
              <Table.Th className={styles.multisportHeader}>
                Multisport
              </Table.Th>
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
              </Table.Tr>
            ))}
            <Table.Tr>
              <Table.Td colSpan={3}>
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
              <NumberInput
                label="Multisport discount"
                decimalScale={2}
                allowNegative={false}
                rightSection={"zł"}
                {...form.getInputProps("multisportDiscount")}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Flex justify="space-between">
          <Group gap="sm">
            <Text className={styles.totalPriceText}>Total price:</Text>
            <Text
              size="xl"
              fw="700"
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 90 }}
            >
              {priceWithoutDiscount - discountValue} zł
            </Text>
          </Group>

          <Button onClick={onSubmit}>Save</Button>
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
