import { Button, Group, Modal, Text } from "@mantine/core";

type ConfirmModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const ConfirmModal = ({
  opened,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text size="sm">{description}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button color="red" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
};
