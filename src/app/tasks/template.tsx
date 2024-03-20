"use client";

import { ReactNode } from "react";

import { Grid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerBox from "@zone/components/core/drawer";
import PageTemplate from "@zone/components/core/template";

export default function Template({ children }: { children: ReactNode }) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <PageTemplate title="Title tasks" onCreate={open}>
      {children}

      <DrawerBox
        opened={opened}
        close={close}
        title="Drawer box tasks"
        onSubmit={() => {}}
      >
        <Grid>
          <Grid.Col span={12}>
            <TextInput label="Booking title" />
          </Grid.Col>
        </Grid>
      </DrawerBox>
    </PageTemplate>
  );
}
