import { useNavigate, useParams } from "react-router";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { Button, Flex } from "@mantine/core";
import styles from "./ShareNewPayment.module.scss";
import classnames from "classnames";
import { useState } from "react";

const firstFrame = 1;
const lastFrame = 4;

export const ShareNewPayment = () => {
  const { paymentId = "" } = useParams();
  const navigate = useNavigate();
  const payment = usePaymentsStore((state) =>
    state.payments.find((p) => p.id === parseInt(paymentId)),
  );

  const [frame, setFrame] = useState(firstFrame);

  const startAnimation = () => {
    const intervalId = setInterval(() => {
      setFrame((f) => {
        const newFrame = f < lastFrame ? f + 1 : firstFrame;

        if (newFrame === lastFrame) {
          clearInterval(intervalId);
        }

        return newFrame;
      });
    }, 200);
  };

  if (!payment) {
    navigate("/");
    return;
  }

  return (
    <Flex direction="column">
      <div className={styles.posterWrapper}>
        <div
          className={classnames(styles.poster, styles["frame" + frame])}
        ></div>
        <div className={classnames(styles.ball, styles["frame" + frame])}></div>
      </div>

      <Button onClick={startAnimation}>Start</Button>
      <Button onClick={() => setFrame(1)}>Reset</Button>
    </Flex>
  );
};
