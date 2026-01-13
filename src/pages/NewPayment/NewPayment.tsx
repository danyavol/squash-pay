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

const durationPresets = ["00:30", "01:00", "01:30", "02:00", "02:30", "03:00"];

export const NewPayment = () => {
  const form = useForm<PaymentForm>({
    mode: "controlled",
    initialValues: {
      courtPrice: 0,
      courtsNumber: 1,
      multisportDiscount: 0,
      duration: durationPresets[1],
      friends: [],
    },
    validate: {
      duration: (value) =>
        durationPresets.includes(value) ? null : "Pick valid duration",
    },
  });

  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));
  friendsMap;

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

        <Flex direction="column">
          <Text size="sm" fw={500}>
            Friends
          </Text>

          <Button
            variant="subtle"
            size="sm"
            leftSection={<UserRoundPlus height="60%" />}
            onClick={openModal}
          >
            Select friends
          </Button>
        </Flex>

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
              {/*  TODO: Take into account discount */}
              {priceWithoutDiscount} zł
            </Text>
          </Group>

          <Button onClick={onSubmit}>Save</Button>
        </Flex>
      </Flex>

      <Modal opened={modalOpened} onClose={closeModal} centered>
        TODO
      </Modal>
    </>
  );
};
