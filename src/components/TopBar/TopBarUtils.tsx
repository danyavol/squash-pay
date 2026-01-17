import { ActionIcon, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Title order={3} fw={600}>
      {children}
    </Title>
  );
};

export const BackButton = () => {
  return (
    <ActionIcon
      variant="transparent"
      color="--mantine-color-text"
      onClick={() => history.back()}
    >
      <ArrowLeft />
    </ActionIcon>
  );
};
