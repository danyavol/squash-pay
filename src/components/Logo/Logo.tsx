import LogoIcon from "../../assets/squash-logo.svg?react";
import { Group, Title } from "@mantine/core";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Group gap="xs">
      <LogoIcon className={styles.icon} />
      <Title order={3} className={styles.title}>
        Squash<span>Pay</span>
      </Title>
    </Group>
  );
};
