"use client";

import "@mantine/spotlight/styles.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Group,
  rem,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { spotlight, Spotlight, SpotlightActionData } from "@mantine/spotlight";
import {
  IconBulb,
  IconCheckbox,
  IconDashboard,
  IconFileText,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import classes from "@zone/app/template.module.css";
import ProviderRoot from "@zone/components/context/provider.root";
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

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: (
      <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: (
      <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: (
      <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
];

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const mainLinks = links.map((link) => (
    <UnstyledButton
      aria-checked={pathname === link.link}
      className={classes.mainLink}
      component={Link}
      href={link.link}
      key={link.label}
    >
      <div className={classes.mainLinkInner}>
        <link.icon
          aria-checked={pathname === link.link}
          className={classes.mainLinkIcon}
          size={20}
          stroke={1.5}
        />
        <span
          aria-checked={pathname === link.link}
          className={classes.mainLinkText}
        >
          {link.label}
        </span>
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
      className={classes.collectionLink}
      href="#"
      key={collection.label}
      onClick={(event) => event.preventDefault()}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
  ));

  return (
    <ProviderRoot>
      <Box component="main" className={classes.page}>
        <Box component="nav" className={classes.navbar}>
          <Box className={classes.section}>
            <UserButton />
          </Box>

          <TextInput
            leftSection={
              <IconSearch
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            }
            mb="sm"
            onClick={spotlight.open}
            placeholder="Search"
            readOnly
            rightSection={<Code className={classes.searchCode}>Cmd + K</Code>}
            rightSectionWidth={70}
            styles={{ section: { pointerEvents: "none" } }}
          />
          <Spotlight
            actions={actions}
            highlightQuery
            nothingFound="Nothing found..."
            searchProps={{
              leftSection: (
                <IconSearch
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              ),
              placeholder: "Search...",
            }}
            shortcut={["mod + k"]}
          />

          <Box className={classes.section}>
            <Box className={classes.mainLinks}>{mainLinks}</Box>
          </Box>

          <Box className={classes.section}>
            <Group
              className={classes.collectionsHeader}
              justify="space-between"
            >
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

        <Box component="main" w="100%">
          {children}
        </Box>
      </Box>
    </ProviderRoot>
  );
}
