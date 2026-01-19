import { Button, Flex } from "@mantine/core";
import {
  selectFriendsMap,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";
import {
  type PaymentData,
  useNewPaymentStore,
} from "../../state/new-payment-store.ts";
import {
  splitPayment,
  getMessageForSharing,
} from "../../services/split-payment.service.ts";
import { isMobileDevice } from "../../services/is-mobile-device.service.ts";
import { notifications } from "@mantine/notifications";
import { type Payment, usePaymentsStore } from "../../state/payments-store.ts";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm.tsx";

export const NewPayment = () => {
  const navigate = useNavigate();
  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));

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

  const onSubmit = () => {
    const splitResults = splitPayment(paymentData);
    const msg = getMessageForSharing(splitResults, friendsMap);

    if (isMobileDevice) {
      navigator
        .share({
          text: msg,
        })
        .then(() => afterSave("Payment saved successfully!"))
        .catch((e) => failedToSave(e, "Failed to share!"));
    } else {
      navigator.clipboard
        .writeText(msg)
        .then(() => afterSave("Payment saved and copied to clipboard!"))
        .catch((e) => failedToSave(e, "Failed to copy to clipboard!"));
    }
  };

  const afterSave = (message: string) => {
    notifications.show({
      message,
      color: "green",
    });

    usePaymentsStore.setState((state) => {
      const newId = (state.payments[state.payments.length - 1]?.id ?? 0) + 1;

      const createdPayment: Payment = {
        ...paymentData,
        id: newId,
        isDeleted: false,
        date: paymentData.date ?? dayjs().format("YYYY-MM-DD"),
      };

      return {
        payments: [...state.payments, createdPayment],
      };
    });

    resetValues();

    navigate("/");
  };

  const failedToSave = (e: Error, title: string) => {
    notifications.show({
      title,
      message: `${e?.name ? e.name + ": " : ""}${e?.message}`,
      color: "red",
      autoClose: false,
    });
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
        <Button onClick={onSubmit}>
          {isMobileDevice ? "Save & share" : "Save & copy"}
        </Button>
      </Flex>
    </>
  );
};
