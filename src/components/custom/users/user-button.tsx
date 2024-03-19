import Link from "next/link";

import { Avatar, Box, rem, Text, Title, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import classes from "./user-button.module.css";

export function UserButton() {
  return (
    <UnstyledButton
      className={classes.wrapper}
      component={Link}
      href="/profile"
    >
      <Avatar src="/logo.svg" radius="sm" size="md" />
      <Box className={classes["wrap-img"]}>
        <Title size={rem(14)}>Alexander VAQ</Title>
        <Text size={rem(12)} c="var(--mantine-color-dimmed)">
          quanva2521@outlook.com
        </Text>
      </Box>
      <IconChevronRight size="1rem" color="var(--mantine-color-dimmed)" />
    </UnstyledButton>
  );
}
