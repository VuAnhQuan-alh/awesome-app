"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Grid, TextInput } from "@mantine/core";
import DrawerBox from "@zone/components/core/drawer";
import PageLayout from "@zone/components/core/layout";

export default function Template({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <PageLayout title="Title tasks" urlAction="?action=create">
      {children}

      <DrawerBox
        opened={params.get("action") === "create"}
        close={() => router.push("/tasks")}
        title="Drawer box tasks"
        onSubmit={() => {}}
      >
        <Grid>
          <Grid.Col span={12}>
            <TextInput label="Booking title" />
          </Grid.Col>
        </Grid>
      </DrawerBox>
    </PageLayout>
  );
}
