import { Stack, Button, Text, Flex, Divider } from "@mantine/core";
import { Trash2 } from "lucide-react";
import { ColorSchemeSwitcher } from "../../components/ColorSchemeSwitcher.tsx";
import { useFriendsStore } from "../../state/friends-store.ts";
import { useNewPaymentStore } from "../../state/new-payment-store.ts";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { useSettingsStore } from "../../state/settings-store.ts";
import { useNavigate } from "react-router";

export const Settings = () => {
  const navigate = useNavigate();
  // TODO: Display settings from settings store

  const resetAllStores = () => {
    useFriendsStore.persist.clearStorage();
    useNewPaymentStore.persist.clearStorage();
    usePaymentsStore.persist.clearStorage();
    useSettingsStore.persist.clearStorage();
    navigate("/");
    location.reload();
  };

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Text fz="var(--mantine-font-size-sm)" fw={500}>
          Switch theme
        </Text>
        <ColorSchemeSwitcher />
      </Flex>

      <Divider />

      <Stack gap="xs">
        <Text c="gray" fz="var(--mantine-font-size-xs)">
          Consider a full data reset if you encounter an unfixable error
        </Text>
        <Button
          onClick={resetAllStores}
          color="red"
          variant="outline"
          size="xs"
          leftSection={<Trash2 size="1rem" />}
        >
          Delete all data
        </Button>
      </Stack>
    </Stack>
  );
};
