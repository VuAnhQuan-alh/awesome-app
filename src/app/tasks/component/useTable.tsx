"use client";

import { useMemo } from "react";

import {
  ActionIcon,
  Anchor,
  Checkbox,
  Group,
  ProgressRoot,
  ProgressSection,
  Text,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { IHeadCell } from "@zone/components/core";

import { ITasksType, TARGET } from "../type";
import classes from "./table.module.css";

type IProps = {
  open: (e: string) => void;
};

const columnHelper = createColumnHelper<ITasksType>();

const useTableTask = (props: IProps) => {
  const { open } = props;

  const HEAD_CELLS: IHeadCell<ITasksType> = useMemo(
    () => ({
      actions: "Actions",
      author: "Author",
      id: "ID",
      progress: "Reviews distribution",
      select: "Select",
      reviews: "Reviews",
      title: "Booking title",
      year: "Year",
    }),
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor("title", {
        cell: (context) => (
          <Anchor component="button" fz="sm">
            {context.getValue()}
          </Anchor>
        ),
        header: () => HEAD_CELLS.title,
      }),
      columnHelper.accessor("year", {
        cell: (context) => context.getValue(),
        header: () => HEAD_CELLS.year,
      }),
      columnHelper.accessor("author", {
        cell: (context) => (
          <Anchor component="button" fz="sm">
            {context.getValue()}
          </Anchor>
        ),
        header: () => HEAD_CELLS.author,
      }),
      columnHelper.accessor("reviews", {
        cell: ({ row }) =>
          row.original.reviews.negative + row.original.reviews.positive,
        header: () => HEAD_CELLS.reviews,
      }),
      columnHelper.accessor("progress", {
        cell: ({
          row: {
            original: { reviews },
          },
        }) => {
          const total = reviews.negative + reviews.positive;
          const positive = (reviews.positive / total) * 100 || 0;
          const negative = (reviews.negative / total) * 100 || 0;

          return (
            <>
              <Group justify="space-between">
                <Text fz="xs" c="teal" fw={700}>
                  {positive.toFixed(0)}%
                </Text>
                <Text fz="xs" c="red" fw={700}>
                  {negative.toFixed(0)}%
                </Text>
              </Group>

              <ProgressRoot>
                <ProgressSection
                  className={classes.progressSection}
                  value={positive}
                  color="teal"
                />
                <ProgressSection
                  className={classes.progressSection}
                  value={negative}
                  color="red"
                />
              </ProgressRoot>
            </>
          );
        },
        header: () => HEAD_CELLS.progress,
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          const handle = () => {
            open(TARGET.TASKS);
            console.log({ data: row.original });
          };
          return (
            <Group justify="end">
              <ActionIcon onClick={handle}>
                <IconPencil size="1rem" />
              </ActionIcon>

              <ActionIcon color="red">
                <IconTrash size="1rem" />
              </ActionIcon>
            </Group>
          );
        },
        header: () => HEAD_CELLS.actions,
      }),
    ],
    [HEAD_CELLS, open]
  );

  const dataTasks = [
    {
      id: "shaPoh0e",
      progress: null,
      title: "Foundation",
      author: "Isaac Asimov",
      year: 1951,
      reviews: { positive: 2223, negative: 259 },
    },
    {
      id: "yu2Af1he",
      progress: null,
      title: "Frankenstein",
      author: "Mary Shelley",
      year: 1818,
      reviews: { positive: 5677, negative: 1265 },
    },
    {
      id: "koe6Lood",
      progress: null,
      title: "Solaris",
      author: "Stanislaw Lem",
      year: 1961,
      reviews: { positive: 3487, negative: 1845 },
    },
    {
      id: "ohhuqu4A",
      progress: null,
      title: "Dune",
      author: "Frank Herbert",
      year: 1965,
      reviews: { positive: 8576, negative: 663 },
    },
    {
      id: "wa3ohFoh",
      progress: null,
      title: "The Left Hand of Darkness",
      author: "Ursula K. Le Guin",
      year: 1969,
      reviews: { positive: 6631, negative: 993 },
    },
    {
      id: "eKaef5Cu",
      progress: null,
      title: "A Scanner Darkly",
      author: "Philip K Dick",
      year: 1977,
      reviews: { positive: 8124, negative: 1847 },
    },
  ];

  return { columns, dataTasks, HEAD_CELLS };
};
export default useTableTask;
