import { Navigate, useNavigate, useParams } from "react-router";
import { usePaymentsStore } from "../../state/payments-store.ts";
import { Button, CloseButton, Flex, Table } from "@mantine/core";
import styles from "./ShareNewPayment.module.scss";
import classnames from "classnames";
import { useMemo, useState } from "react";
import { isMobileDevice } from "../../services/is-mobile-device.service.ts";
import { notifications } from "@mantine/notifications";
import {
  getMessageForSharing,
  splitPayment,
} from "../../services/split-payment.service.ts";
import {
  selectFriendsMap,
  useFriendsStore,
} from "../../state/friends-store.ts";
import { useShallow } from "zustand/react/shallow";

const firstFrame = 1;
const lastFrame = 4;
const frames = [1, 2, 3, 4];

export const ShareNewPayment = () => {
  const { paymentId = "" } = useParams();
  const navigate = useNavigate();
  const payment = usePaymentsStore((state) =>
    state.payments.find((p) => p.id === parseInt(paymentId)),
  );
  const friendsMap = useFriendsStore(useShallow(selectFriendsMap));

  const [activeFrame, setActiveFrame] = useState(firstFrame);

  const splitResults = useMemo(
    () => payment && splitPayment(payment),
    [payment],
  );

  if (!payment || !splitResults) {
    return <Navigate to="/" replace />;
  }

  const animate = () => {
    return new Promise((res) => {
      const intervalId = setInterval(() => {
        setActiveFrame((f) => {
          const newFrame = f < lastFrame ? f + 1 : firstFrame;

          if (newFrame === lastFrame) {
            clearInterval(intervalId);
            setTimeout(res, 1000);
          }

          return newFrame;
        });
      }, 200);
    });
  };

  const failedToShareNotification = (e: Error, title: string) => {
    notifications.show({
      title,
      message: `${e?.name ? e.name + ": " : ""}${e?.message}`,
      color: "red",
      autoClose: false,
    });
  };

  const share = () => {
    const splitResults = splitPayment(payment);
    const msg = getMessageForSharing(splitResults, friendsMap);

    if (isMobileDevice) {
      navigator
        .share({
          text: msg,
        })
        .catch((e) => {
          failedToShareNotification(e, "Failed to share!");
        })
        .finally(() => animate().then(() => navigate("/")));
    } else {
      navigator.clipboard
        .writeText(msg)
        .catch((e) => {
          failedToShareNotification(e, "Failed to copy to clipboard!");
        })
        .finally(() => animate().then(() => navigate("/")));
    }
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      className={styles.shareWrapper}
    >
      <CloseButton
        className={styles.closeButton}
        onClick={() => navigate("/")}
      />

      <Flex direction="column" className={styles.overflowHidden}>
        <div className={styles.posterWrapper}>
          {frames.map((frame) => (
            <div
              key={frame}
              className={classnames(styles.poster, styles["frame" + frame], {
                [styles.active]: frame === activeFrame,
              })}
            ></div>
          ))}
          <div
            className={classnames(styles.ball, styles["frame" + activeFrame])}
          ></div>
        </div>

        <Flex m="xl" className={styles.overflowAuto}>
          <Table
            withRowBorders={false}
            stickyHeader
            className={styles.friendsTable}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className={styles.indexHeader}>#</Table.Th>
                <Table.Th>Person</Table.Th>
                <Table.Th className={styles.priceHeader}>Price</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {splitResults.map((result, index) => (
                <Table.Tr key={result.friendId}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{friendsMap[result.friendId].name}</Table.Td>
                  <Table.Td>{result.amount} zł</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Flex>
      </Flex>

      <Button onClick={share} size="lg" mx="xl" mb="xl">
        {isMobileDevice ? "Share" : "Copy"}
      </Button>
    </Flex>
  );
};
