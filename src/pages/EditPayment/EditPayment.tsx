import { useNavigate, useParams } from "react-router";
import { type Payment, usePaymentsStore } from "../../state/payments-store.ts";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm.tsx";
import type { PaymentData } from "../../state/new-payment-store.ts";

export const EditPayment = () => {
  const { paymentId = "" } = useParams();

  const navigate = useNavigate();
  const { paymentIndex, payments } = usePaymentsStore((state) => ({
    paymentIndex: state.payments.findIndex((p) => p.id === parseInt(paymentId)),
    payments: state.payments,
  }));

  const payment: Payment | undefined = payments[paymentIndex];

  const updatePayment = <T extends keyof PaymentData>(
    key: T,
    setter: (curr: PaymentData[T]) => PaymentData[T],
  ) => {
    usePaymentsStore.setState(() => {
      const newPayment = { ...payment, [key]: setter(payment[key]) };
      const newPayments = [...payments];
      newPayments[paymentIndex] = newPayment;

      return { payments: newPayments };
    });
  };

  if (!payment) return navigate("/");

  return (
    <>
      <PaymentForm formValue={payment} setFormValue={updatePayment} />
    </>
  );
};
