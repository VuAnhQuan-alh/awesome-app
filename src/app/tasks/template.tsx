"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Grid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerBox from "@zone/components/core/drawer";
import PageTemplate from "@zone/components/core/template";

export default function Template({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [opened, { open, close }] = useDisclosure();

  return (
    <PageTemplate title="Title tasks" urlAction="?action=create">
      {children}

      <DrawerBox
        opened={params.get("action") === "create"}
        close={() => router.replace("/tasks")}
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
