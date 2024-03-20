"use client";

import { useState } from "react";

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
  Tooltip,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import {
  IconFilter,
  IconPlus,
  IconSearch,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { TableCore } from "@zone/components/core";

import { ITasksType } from "../type";
import useTableTask from "./useTable";

type TFilter = {
  object: null | string;
  method: string | null;
  result: string;
};

export default function TableTask() {
  const { columns, dataTasks } = useTableTask();

  const [filters, setFilters] = useState<string[]>([]);
  const handleCloseFilter = (idx: number) => {
    setFilters((filter) => filter.filter((_, index) => idx !== index));
  };

  const { Field, Subscribe, handleSubmit } = useForm<TFilter>({
    defaultValues: {
      object: null,
      method: null,
      result: "",
    },
    onSubmit: async ({ value: { object, method, result }, formApi }) => {
      if (object && method) {
        setFilters((filter) => [...filter, `${object} ${method} ${result}`]);
        formApi.reset();
      }
    },
  });

  return (
    <Box>
      <Group mb="sm" justify="space-between">
        <Group>
          <TextInput
            placeholder="Search"
            leftSection={<IconSearch size="0.75rem" stroke={1.5} />}
          />

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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void handleSubmit();
                }}
              >
                <Stack>
                  <Field name="object">
                    {(field) => (
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        data={[
                          { value: "booking", label: "Booking title" },
                          { value: "year", label: "Year" },
                          { value: "created", label: "Created at" },
                        ]}
                      />
                    )}
                  </Field>

                  <Field name="method">
                    {(field) => (
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        data={[
                          { value: "is", label: "is" },
                          { value: "is-not", label: "is not" },
                          { value: "is-null", label: "is null" },
                          { value: "is-not-null", label: "is not null" },
                          { value: "is-gt", label: "is greater than" },
                          {
                            value: "is-gte",
                            label: "Is greater than or equal to",
                          },
                          { value: "is-lt", label: "is lower than" },
                          {
                            value: "is-lte",
                            label: "is lower than or equal to",
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
              </form>
            </PopoverDropdown>
          </Popover>

          {filters.map((item, idx) => (
            <Button
              variant="light"
              onClick={() => handleCloseFilter(idx)}
              rightSection={<IconX size="1rem" />}
              key={randomId()}
            >
              {item}
            </Button>
          ))}
        </Group>

        <Tooltip withArrow label="View settings">
          <ActionIcon c="violet" variant="light" aria-label="Settings">
            <IconSettings size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Group>

      <TableCore<ITasksType>
        title="Someone task for table"
        loading={false}
        columns={columns}
        data={dataTasks}
      />
    </Box>
  );
}
