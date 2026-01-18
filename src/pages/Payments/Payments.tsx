import { Button, Flex, Stack, Paper, Group, Text } from "@mantine/core";
import {
  Plus,
  Users,
  IdCard,
  BadgeDollarSign,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router";
import styles from "./Payments.module.scss";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { useMemo } from "react";
import { getDurationInHours } from "../../services/duration.service.ts";

export const Payments = () => {
  const { payments } = usePaymentsStore();

  const mappedPayments = useMemo(
    () =>
      payments.map((p) => {
        const priceWithoutDiscount =
          p.courtPrice * p.courtsNumber * getDurationInHours(p.duration);
        const multisportsNumber = p.friends.reduce((acc, f) => {
          return acc + f.multisportsNumber;
        }, 0);
        const totalPrice =
          priceWithoutDiscount - multisportsNumber * p.multisportDiscount;

        return {
          date: p.date,
          friendsNumber: p.friends.length,
          multisportsNumber,
          totalPrice,
        };
      }),
    [payments],
  );

  // TODO: Make it clickable
  return (
    <Stack>
      <NavLink to="/new" className={styles.link}>
        <Button leftSection={<Plus />} fullWidth>
          Add new payment
        </Button>
      </NavLink>
      <Flex direction="column-reverse" gap="sm">
        {mappedPayments.map((payment, index) => (
          <Paper key={index} p="md" withBorder={true}>
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
        ))}
      </Flex>
    </Stack>
  );
};
