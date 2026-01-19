import { Group, Paper, Stack, Text } from "@mantine/core";
import { BadgeDollarSign, ChevronRight, IdCard, Users } from "lucide-react";

type PaymentCardProps = {
  payment: {
    date: string;
    friendsNumber: number;
    multisportsNumber: number;
    totalPrice: number;
  };
};

export const PaymentCard = ({ payment }: PaymentCardProps) => {
  return (
    <Paper p="md" withBorder={true}>
      <Group>
        <Stack gap="xs" style={{ flexGrow: 1 }}>
          <Text fw="600">Played on {payment.date}</Text>
          <Group grow>
            <Group gap="xs">
              <Users size="1.25rem" color="gray" />
              <Text fw={600}>{payment.friendsNumber}</Text>
            </Group>
            <Group gap="xs">
              <IdCard size="1.25rem" color="gray" />
              <Text fw={600}>{payment.multisportsNumber}</Text>
            </Group>
            <Group gap="xs">
              <BadgeDollarSign size="1.25rem" color="gray" />
              <Text fw={600}>{payment.totalPrice} zł</Text>
            </Group>
          </Group>
        </Stack>
        <ChevronRight color="gray" />
      </Group>
    </Paper>
  );
};
