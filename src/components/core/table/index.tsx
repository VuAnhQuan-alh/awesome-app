"use client";

import { ReactNode, useState } from "react";

import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  rem,
  Select,
  Stack,
  Table,
  TableCaption,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTfoot,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import {
  IconFilter,
  IconLoader,
  IconPlus,
  IconSearch,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import {
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { IconEmpty } from "@zone/components/icons";

import classes from "./table.module.css";

interface ITableProps<T> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  // property
  loading: boolean;
  title: string;
  headCells: Record<string, string>;

  // optional
  visibleTfoot?: boolean;
  hiddenVisible?: boolean;
  hiddenFilter?: ReactNode;
}

type TFilter = {
  object: null | string;
  method: string | null;
  result: string;
};

function TableCore<T = unknown>(props: ITableProps<T>) {
  console.debug("Render or rerender TABLE");
  const {
    columns,
    loading,
    title,
    headCells,

    visibleTfoot = true,
    hiddenVisible = false,
    hiddenFilter = false,
    ...tableProps
  } = props;

  const { getHeaderGroups, getRowModel, getFooterGroups, getAllLeafColumns } =
    useReactTable({
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      ...tableProps,
    });

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
    <Box pos="relative">
      <Group mb="sm" justify="space-between">
        {!hiddenFilter && (
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
                          data={getAllLeafColumns()
                            .filter(
                              (column) =>
                                !["select", "id", "actions"].includes(column.id)
                            )
                            .map((column) => ({
                              value: column.id,
                              label: headCells[column.id],
                            }))}
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
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
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
        )}

        {!hiddenVisible && (
          <Popover trapFocus position="bottom-end" withArrow>
            <PopoverTarget>
              <ActionIcon c="violet" aria-label="Settings">
                <IconSettings size="1rem" />
              </ActionIcon>
            </PopoverTarget>

            <PopoverDropdown>
              <Title order={6} mb="xs">
                Displayed fields
              </Title>

              <Stack gap={10}>
                {getAllLeafColumns().map((column, idx) => (
                  <Checkbox
                    key={idx}
                    label={headCells[column.id]}
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                ))}
              </Stack>
            </PopoverDropdown>
          </Popover>
        )}
      </Group>

      <TableScrollContainer minWidth="content">
        <Table verticalSpacing="xs" captionSide="top" highlightOnHover>
          <TableCaption>{title}</TableCaption>
          <TableThead>
            {getHeaderGroups().map((headerGroup) => (
              <TableTr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableTh
                      c="var(--mantine-color-gray-8)"
                      className={
                        header.column.id === "actions"
                          ? classes["text-end"]
                          : ""
                      }
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableTh>
                  );
                })}
              </TableTr>
            ))}
          </TableThead>

          <TableTbody style={{ opacity: loading ? 0.25 : 1 }}>
            {getRowModel().rows.map((row) => {
              return (
                <TableTr
                  key={row.id}
                  className={row.getIsSelected() ? "selected" : ""}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableTd
                        key={cell.id}
                        onClick={() => {
                          if (cell.column.id === "select") {
                            row.getToggleSelectedHandler();
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableTd>
                    );
                  })}
                </TableTr>
              );
            })}
          </TableTbody>

          {!visibleTfoot && (
            <TableTfoot>
              {getFooterGroups().map((footerGroup) => (
                <TableTr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => {
                    return (
                      <TableTh key={footer.id}>
                        {footer.isPlaceholder
                          ? null
                          : flexRender(
                              footer.column.columnDef.header,
                              footer.getContext()
                            )}
                      </TableTh>
                    );
                  })}
                </TableTr>
              ))}
            </TableTfoot>
          )}
        </Table>
      </TableScrollContainer>

      {props.data.length === 0 && !loading && (
        <Stack align="center" justify="center" h={rem(260)}>
          <Box w={rem(210)}>
            <IconEmpty />
          </Box>

          <Text c="var(--mantine-color-violet-3)" fw={700} fz="sm">
            No data
          </Text>
        </Stack>
      )}

      {loading && (
        <Box pos="relative">
          <Stack
            pos="absolute"
            top={rem(0)}
            style={{ translateX: "-50%", translateY: "-50%" }}
            align="center"
            justify="center"
            h={rem(260)}
            w="100%"
          >
            <IconLoader
              className={classes["spine-pin"]}
              size="3rem"
              color="var(--mantine-color-violet-3)"
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default TableCore;
