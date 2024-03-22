"use client";

import { zodResolver } from "mantine-form-zod-resolver";
import { ReactNode, useCallback } from "react";
import { z } from "zod";

import { Grid } from "@mantine/core";
import { useContextForm } from "@zone/components/context/form.context";
import { useTemplate } from "@zone/components/context/template.context";
import { SelectField, TextField, YearPickerField } from "@zone/components/core";
import DrawerBox from "@zone/components/core/drawer";
import PageTemplate from "@zone/components/core/template";
import { DRAWER_TARGET } from "@zone/types/type";

type ITaskField = {
  title: string;
  year: string | Date | null;
  author: string | null;
};

const schema = z.object({
  title: z.string().min(4),
  year: z.date(),
  author: z.string().trim(),
});

export default function Template({ children }: { children: ReactNode }) {
  const context = useTemplate();

  const form = useContextForm({
    initialValues: { title: "", year: null, author: null },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = useCallback((values: ITaskField | unknown) => {
    console.log({ values });
    context.close(DRAWER_TARGET.TASKS);
    form.reset();
  }, []);

  const handleClose = useCallback(() => {
    context.close(DRAWER_TARGET.TASKS);
    form.reset();
    form.clearErrors();
  }, []);

  return (
    <PageTemplate
      title="Title tasks"
      onCreate={() => context.open(DRAWER_TARGET.TASKS)}
    >
      {children}

      <DrawerBox<ITaskField>
        close={handleClose}
        form={form}
        handleSubmit={handleSubmit}
        opened={context.opened && context.target === DRAWER_TARGET.TASKS}
        title="Drawer box tasks"
      >
        <Grid gutter="xs">
          <TextField label="Booking title" name="title" span={12} />
          <YearPickerField label="Year" span={4} name="year" />
          <SelectField
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
