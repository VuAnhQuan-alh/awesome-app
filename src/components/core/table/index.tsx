"use client";

import {
  Box,
  rem,
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
} from "@mantine/core";
import { IconLoader } from "@tabler/icons-react";
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

  // optional
  hiddenTfoot?: boolean;
}

function TableCore<T = unknown>(props: ITableProps<T>) {
  const { hiddenTfoot = true } = props;

  const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    ...props,
  });

  return (
    <Box pos="relative">
      <TableScrollContainer minWidth="content">
        <Table verticalSpacing="xs" captionSide="top" highlightOnHover>
          <TableCaption>Some elements from periodic table</TableCaption>
          <TableThead>
            {getHeaderGroups().map((headerGroup) => (
              <TableTr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableTh c="var(--mantine-color-gray-8)" key={header.id}>
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

          <TableTbody style={{ opacity: props.loading ? 0.25 : 1 }}>
            {getRowModel().rows.map((row) => {
              return (
                <TableTr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableTd key={cell.id}>
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

          {!hiddenTfoot && (
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

      {props.data.length === 0 && !props.loading && (
        <Stack align="center" justify="center" h={rem(260)}>
          <Box w={rem(210)}>
            <IconEmpty />
          </Box>

          <Text c="var(--mantine-color-violet-3)" fw={700} fz="sm">
            No data
          </Text>
        </Stack>
      )}

      {props.loading && (
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
export { TableCore };
