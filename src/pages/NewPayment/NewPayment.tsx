import { Button, Flex } from "@mantine/core";
import {
  type PaymentData,
  useNewPaymentStore,
} from "../../state/new-payment-store.ts";
import { type Payment, usePaymentsStore } from "../../state/payments-store.ts";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm.tsx";

export const NewPayment = () => {
  const navigate = useNavigate();

  const {
    courtsNumber,
    courtPrice,
    multisportDiscount,
    duration,
    friends,
    date,
    resetValues,
  } = useNewPaymentStore();

  const paymentData: PaymentData = {
    courtsNumber,
    courtPrice,
    multisportDiscount,
    duration,
    friends,
    date,
  };

  const save = () => {
    usePaymentsStore.setState((state) => {
      const newId = (state.payments[state.payments.length - 1]?.id ?? 0) + 1;

      const createdPayment: Payment = {
        ...paymentData,
        id: newId,
        isDeleted: false,
        date: paymentData.date ?? dayjs().format("YYYY-MM-DD"),
      };

      setTimeout(() => {
        navigate(`/share/${newId}`);
      });

      return {
        payments: [...state.payments, createdPayment],
      };
    });

    resetValues();
  };

  return (
    <>
      <PaymentForm
        formValue={paymentData}
        setFormValue={(key, setter) =>
          useNewPaymentStore.setState((state) => ({
            [key]: setter(state[key]),
          }))
        }
      />

      <Flex justify="end" mt="lg">
        <Button onClick={save}>Save</Button>
      </Flex>
    </>
  );
};
