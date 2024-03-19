"use client";

import Link from "next/link";
import { ReactNode } from "react";

import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Container,
  Group,
  rem,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBulb,
  IconCheckbox,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import classes from "@zone/app/template.module.css";
import { UserButton } from "@zone/components/custom";

const links = [
  { icon: IconHome, label: "Dashboard", link: "/" },
  { icon: IconBulb, label: "Activity", link: "/activities", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", link: "/tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts", link: "/contacts" },
];

const collections = [
  { emoji: "👍", label: "Sales" },
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💸", label: "Discounts" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

export default function Template({ children }: { children: ReactNode }) {
  const mainLinks = links.map((link) => (
    <UnstyledButton
      component={Link}
      href={link.link}
      key={link.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
  ));

  return (
    <Box component="main" className={classes.page}>
      <Box component="nav" className={classes.navbar}>
        <Box className={classes.section}>
          {/* <UserButton /> */}
          <UserButton />
        </Box>

        <TextInput
          placeholder="Search"
          size="xs"
          leftSection={
            <IconSearch
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ section: { pointerEvents: "none" } }}
          mb="sm"
        />

        <Box className={classes.section}>
          <Box className={classes.mainLinks}>{mainLinks}</Box>
        </Box>

        <Box className={classes.section}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed">
              Collections
            </Text>
            <Tooltip label="Create collection" withArrow position="right">
              <ActionIcon variant="default" size={18}>
                <IconPlus
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Box className={classes.collections}>{collectionLinks}</Box>
        </Box>
      </Box>

      <Box component="main" w="100%" pb="md">
        <Container h={rem(70)}>
          <Title order={2} pt="md" tt="capitalize" c="dark">
            Title
          </Title>
        </Container>

        {children}
      </Box>
    </Box>
  );
}
