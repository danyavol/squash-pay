import { Button, Flex, Stack } from "@mantine/core";
import { Plus } from "lucide-react";
import { NavLink } from "react-router";
import styles from "./Payments.module.scss";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { useMemo } from "react";
import { getDurationInHours } from "../../services/duration.service.ts";
import { PaymentCard } from "./PaymentCard/PaymentCard.tsx";

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
          id: p.id,
          date: p.date || "",
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
        {mappedPayments.map((payment) => (
          <NavLink
            key={payment.id}
            to={`/edit/${payment.id}`}
            className={styles.link}
          >
            <PaymentCard payment={payment} />
          </NavLink>
        ))}
      </Flex>
    </Stack>
  );
};
