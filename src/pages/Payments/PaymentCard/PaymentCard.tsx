import { Group, Paper, Stack, Text } from "@mantine/core";
import { BadgeDollarSign, ChevronRight, Users } from "lucide-react";
import styles from "./PaymentCard.module.scss";
import classnames from "classnames";

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
    <Paper
      p="md"
      withBorder={true}
      className={classnames("mantine-active", styles.card)}
    >
      <Group>
        <Stack gap="xs" style={{ flexGrow: 1 }}>
          <Text fw="600">Played on {payment.date}</Text>
          <Group>
            <Group className={styles.iconGroup}>
              <Users size="1.125rem" color="gray" />
              <Text fw={500} size="sm" className={styles.friendsNumber}>
                {payment.friendsNumber}
              </Text>
            </Group>
            <Group className={styles.iconGroup}>
              <BadgeDollarSign size="1.125rem" color="gray" />
              <Text fw={500} size="sm">
                {payment.totalPrice} zł
              </Text>
            </Group>
          </Group>
        </Stack>
        <ChevronRight color="gray" />
      </Group>
    </Paper>
  );
};
