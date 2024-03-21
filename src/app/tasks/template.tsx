"use client";

import { ReactNode } from "react";

import { Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { SelectField, TextField, YearPickerField } from "@zone/components/core";
import DrawerBox from "@zone/components/core/drawer";
import PageTemplate from "@zone/components/core/template";

type ITaskField = {
  title: string;
  year: string | Date | null;
};

export default function Template({ children }: { children: ReactNode }) {
  const [opened, { open, close }] = useDisclosure();
  const { handleSubmit, Subscribe, Field } = useForm<ITaskField>({
    defaultValues: {
      title: "",
      year: null,
    },
    onSubmit: ({ value }) => {
      const year = value.year ? new Date(value.year).getFullYear() : null;
      console.log("value", { ...value, year });
    },
  });

  return (
    <PageTemplate title="Title tasks" onCreate={open}>
      {children}

      <DrawerBox
        close={close}
        handleSubmit={handleSubmit}
        opened={opened}
        Subscribe={Subscribe}
        title="Drawer box tasks"
      >
        <Grid gutter="xs">
          <TextField
            Control={Field}
            label="Booking title"
            name="title"
            span={12}
          />

          <YearPickerField Control={Field} label="Year" span={4} name="year" />

          <SelectField
            Control={Field}
            data={[{ value: "abc", label: "Abc - xyz" }]}
            label="Author"
            name="author"
            span={8}
          />
        </Grid>
      </DrawerBox>
    </PageTemplate>
  );
}
