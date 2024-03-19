"use client";

import {
  ActionIcon,
  Box,
  Button,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import {
  IconFilter,
  IconPlus,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { TableCore } from "@zone/components/core";

import { ITasksType } from "../type";
import useTableTask from "./useTable";

export default function TableTask() {
  const { columns, dataTasks } = useTableTask();
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      object: "",
      method: "",
      result: "",
    },
    onSubmit: async ({ value }) => {
      console.log({ value });
    },
  });

  return (
    <Box>
      <Group mb="sm" justify="space-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            console.log("vao dya roi", e);
          }}
        >
          <Group>
            <Field name="search">
              {(field) => (
                <TextInput
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  leftSection={<IconSearch size="0.75rem" stroke={1.5} />}
                />
              )}
            </Field>

            <Popover
              trapFocus
              position="bottom-start"
              withArrow
              arrowPosition="side"
              closeOnClickOutside={false}
              width={280}
            >
              <PopoverTarget>
                <Button
                  leftSection={
                    <IconFilter
                      size="1rem"
                      color="var(--mantine-color-violet-5)"
                    />
                  }
                >
                  Filters
                </Button>
              </PopoverTarget>

              <PopoverDropdown>
                <Stack>
                  <Field name="object">
                    {(field) => (
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e || "")}
                        data={[{ value: "createdAt", label: "Created at" }]}
                      />
                    )}
                  </Field>

                  <Field name="method">
                    {(field) => (
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e || "")}
                        data={[
                          { value: "is", label: "Is" },
                          { value: "is-not", label: "Is not" },
                          { value: "is-null", label: "Is null" },
                          { value: "is-not-null", label: "Is not null" },
                          { value: "is-gt", label: "Is greater than" },
                          {
                            value: "is-gte",
                            label: "Is greater than or equal to",
                          },
                          { value: "is-lt", label: "Is lower than" },
                          {
                            value: "is-lte",
                            label: "Is lower than or equal to",
                          },
                        ]}
                      />
                    )}
                  </Field>

                  <Field name="result">
                    {(field) => (
                      <TextInput
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </Field>

                  <Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        leftSection={<IconPlus size="1rem" />}
                        type="submit"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? "..." : "Add filter"}
                      </Button>
                    )}
                  </Subscribe>
                </Stack>
              </PopoverDropdown>
            </Popover>
          </Group>
        </form>

        <ActionIcon c="violet" variant="light" aria-label="Settings">
          <IconSettings size="1rem" />
        </ActionIcon>
      </Group>

      <TableCore<ITasksType>
        loading={false}
        columns={columns}
        data={dataTasks}
      />
    </Box>
  );
}
