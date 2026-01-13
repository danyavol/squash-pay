import { ActionIcon, Text } from "@mantine/core";
import { Minus, Plus } from "lucide-react";
import styles from "./NumberIncrementor.module.scss";

type NumberIncrementorProps = {
  value: number;
  decrease: () => void;
  increase: () => void;
  label?: string;
};

export const NumberIncrementor = ({
  value,
  decrease,
  increase,
  label,
}: NumberIncrementorProps) => {
  return (
    <div>
      {label && (
        <Text size="sm" fw={500} className={styles.title}>
          {label}
        </Text>
      )}
      <ActionIcon.Group className={styles.group}>
        <ActionIcon variant="default" size="lg" c="dimmed" onClick={decrease}>
          <Minus size={18} />
        </ActionIcon>
        <ActionIcon.GroupSection
          variant="default"
          size="lg"
          className={styles.value}
        >
          <Text size="sm">{value}</Text>
        </ActionIcon.GroupSection>
        <ActionIcon variant="default" size="lg" c="dimmed" onClick={increase}>
          <Plus size={18} />
        </ActionIcon>
      </ActionIcon.Group>
    </div>
  );
};
