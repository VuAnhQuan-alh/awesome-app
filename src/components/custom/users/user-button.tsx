import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Box, rem, Text, Title, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import classes from "./user-button.module.css";
import { useAuth } from "@zone/components/context/auth.context";

export function UserButton() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <UnstyledButton
      aria-checked={pathname.includes("/profile")}
      className={classes.wrapper}
      component={Link}
      href="/profile"
    >
      <Avatar
        src={user ? "/logo.svg" : "/not-user.svg"}
        radius="sm"
        size="md"
      />
      <Box className={classes["wrap-img"]}>
        <Title size={rem(14)}>{user?.aud || "Anonymous"}</Title>
        <Text size={rem(12)} c="var(--mantine-color-dimmed)">
          {user?.email || "example@info.io"}
        </Text>
      </Box>
      <IconChevronRight size="1rem" color="var(--mantine-color-dimmed)" />
    </UnstyledButton>
  );
}
