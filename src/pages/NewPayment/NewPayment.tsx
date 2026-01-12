import { TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Button, Flex, NumberInput, Text } from "@mantine/core";
import type { PaymentForm } from "../../types/PaymentForm.type.ts";
import { useMemo } from "react";
import {
  selectFriendsMap,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";

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

  const durationInHours = useMemo(() => {
    const isValid = !form.validateField("duration").hasError;

    const index = durationPresets.findIndex((v) => v === form.values.duration);

    if (!isValid || index < 0) return 0;

    return (index + 1) * 0.5;
  }, [form.values.duration]);

  const priceWithoutDiscount = useMemo(() => {
    return form.values.courtPrice * form.values.courtsNumber * durationInHours;
  }, [form.values.courtPrice, form.values.courtsNumber, durationInHours]);

  const onSubmit = (value: ReturnType<typeof form.getValues>) => {
    console.log(value);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex direction="column" gap="sm" align="start">
        <Flex gap="sm" align="end">
          <NumberInput
            label="Price"
            description="per court, per hour"
            decimalScale={2}
            allowNegative={false}
            rightSection={"zł"}
            {...form.getInputProps("courtPrice")}
          />
          <NumberInput
            label="Courts"
            allowDecimal={false}
            allowNegative={false}
            {...form.getInputProps("courtsNumber")}
          />
          <TimePicker
            label="Duration"
            withDropdown
            presets={durationPresets}
            {...form.getInputProps("duration")}
          />
        </Flex>

        <Text>Price without discount: {priceWithoutDiscount} zł</Text>

        <NumberInput
          label="Multisport discount"
          decimalScale={2}
          allowNegative={false}
          rightSection={"zł"}
          {...form.getInputProps("multisportDiscount")}
        />

        <Text>Players:</Text>

        {JSON.stringify(friendsMap)}

        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
