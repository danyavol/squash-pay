import { Button, Flex } from "@mantine/core";
import { Plus } from "lucide-react";
import { NavLink } from "react-router";
import styles from "./Payments.module.scss";

export const Payments = () => {
  return (
    <Flex>
      <NavLink to="/new" className={styles.link}>
        <Button leftSection={<Plus />} fullWidth>
          Add new payment
        </Button>
      </NavLink>
    </Flex>
  );
};
