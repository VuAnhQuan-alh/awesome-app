"use client";

import "@mantine/spotlight/styles.css";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  rem,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBrandAmongUs,
  IconBrandAsana,
  IconBroadcast,
  IconBulb,
  IconCheckbox,
  IconHomeEco,
  IconLocation,
  IconLogin2,
  IconLogout2,
  IconMist,
  IconMoodUnamused,
  IconPlus,
  IconSubtask,
  IconUser,
} from "@tabler/icons-react";
import classes from "@zone/app/template.module.css";
import { AuthConsumer } from "@zone/components/context/auth.context";
import ProviderRoot from "@zone/components/context/provider.root";
import { UserButton } from "@zone/components/custom";
import { useSignOut } from "@zone/hooks/useProfile";

import SpotlightMain from "./component/spotlight";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: signOut } = useSignOut();

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

  const adminLinks = admins.map((link) => (
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

          <AuthConsumer>
            {(auth) => auth?.user && <SpotlightMain />}
          </AuthConsumer>

          <Box className={classes.section}>
            <Box className={classes.mainLinks}>{mainLinks}</Box>
          </Box>

          <AuthConsumer>
            {(auth) =>
              auth?.user && (
                <>
                  <Box className={classes.section}>
                    <Group
                      className={classes.collectionsHeader}
                      justify="space-between"
                    >
                      <Text size="xs" fw={500} c="dimmed">
                        Administration
                      </Text>

                      <ActionIcon variant="default" size={18}>
                        <IconSubtask
                          style={{ width: rem(12), height: rem(12) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Group>

                    <Box className={classes.collections}>
                      <Box className={classes.mainLinks}>{adminLinks}</Box>
                    </Box>
                  </Box>

                  <Box className={classes.section}>
                    <Group
                      className={classes.collectionsHeader}
                      justify="space-between"
                    >
                      <Text size="xs" fw={500} c="dimmed">
                        Collections
                      </Text>

                      <ActionIcon variant="default" size={18}>
                        <IconPlus
                          style={{ width: rem(12), height: rem(12) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Group>

                    <Box className={classes.collections}>{collectionLinks}</Box>
                  </Box>
                </>
              )
            }
          </AuthConsumer>

          <Flex dir="column" align="end" h="100%">
            <AuthConsumer>
              {(auth) => (
                <ActionIcon
                  color="violet"
                  onClick={() => {
                    if (!auth?.user) {
                      router.push("/auth");
                    } else {
                      signOut();
                      auth.setUser(null);
                      router.push("/");
                    }
                  }}
                  size="lg"
                  w="100%"
                >
                  {auth?.user ? <IconLogout2 /> : <IconLogin2 />}
                </ActionIcon>
              )}
            </AuthConsumer>
          </Flex>
        </Box>

        <Box component="main" w="100%">
          {children}
        </Box>
      </Box>
    </ProviderRoot>
  );
}

const links = [
  { icon: IconBrandAsana, label: "Dashboard", link: "/" },
  { icon: IconBulb, label: "Activity", link: "/activities", notifications: 3 },
  { icon: IconMist, label: "Mission", link: "/missions", notifications: 4 },
  { icon: IconBroadcast, label: "Contacts", link: "/contacts" },
];

const collections = [
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

const admins = [
  {
    icon: IconHomeEco,
    label: "Operators",
    link: "/operators",
  },
  {
    icon: IconLocation,
    label: "Locations",
    link: "/locations",
  },
  {
    icon: IconBrandAmongUs,
    label: "Authors",
    link: "/authors",
  },
  { icon: IconCheckbox, label: "Tasks", link: "/tasks" },
  { icon: IconUser, label: "Staffs", link: "/staffs" },
  { icon: IconMoodUnamused, label: "Permissions", link: "/permissions" },
];
