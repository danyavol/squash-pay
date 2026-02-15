import { Stack, Button, Text, Flex, Divider, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash2 } from "lucide-react";
import { ColorSchemeSwitcher } from "../../components/ColorSchemeSwitcher.tsx";
import { ConfirmModal } from "../../components/ConfirmModal.tsx";
import { useFriendsStore } from "../../state/friends-store.ts";
import { useNewPaymentStore } from "../../state/new-payment-store.ts";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { useSettingsStore } from "../../state/settings-store.ts";
import type { Rounding } from "../../state/settings-store.ts";
import { useNavigate } from "react-router";

const roundingOptions = [
  { value: "exact", label: "Exact" },
  { value: "round", label: "Round" },
  { value: "round-up", label: "Round up" },
] satisfies { value: Rounding; label: string }[];

const roundingDescription = {
  exact: "10.33 zł → 10.33 zł",
  round: "10.33 zł → 10 zł",
  "round-up": "10.33 zł → 11 zł",
} satisfies Record<Rounding, string>;

export const Settings = () => {
  const navigate = useNavigate();
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { rounding, setRounding } = useSettingsStore();

  const resetAllStores = () => {
    useFriendsStore.persist.clearStorage();
    useNewPaymentStore.persist.clearStorage();
    usePaymentsStore.persist.clearStorage();
    useSettingsStore.persist.clearStorage();
    navigate("/");
    location.reload();
  };

  return (
    <>
      <Stack>
        <Flex justify="space-between" align="center">
          <Text fz="var(--mantine-font-size-sm)" fw={500}>
            Switch theme
          </Text>
          <ColorSchemeSwitcher />
        </Flex>

        <Select
          label="Prices rounding"
          description={roundingDescription[rounding]}
          data={roundingOptions}
          value={rounding}
          onChange={(value) => value && setRounding(value as Rounding)}
          allowDeselect={false}
        />

        <Divider />

        <Stack gap="xs">
          <Text c="gray" fz="var(--mantine-font-size-xs)">
            Consider a full data reset if you encounter an unfixable error
          </Text>
          <Button
            onClick={openModal}
            color="red"
            variant="outline"
            size="xs"
            leftSection={<Trash2 size="1rem" />}
          >
            Delete all data
          </Button>
        </Stack>
      </Stack>

      <ConfirmModal
        opened={modalOpened}
        onClose={closeModal}
        onConfirm={resetAllStores}
        title="Delete all data"
        description="This will permanently delete all your data including payments, friends, and settings. This action cannot be undone."
        confirmLabel="Delete"
      />
    </>
  );
};
