"use client";

import { useMemo } from "react";

import {
  Anchor,
  Group,
  ProgressRoot,
  ProgressSection,
  Text,
} from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { IHeadCell } from "@zone/components/core";

import { ITasksType } from "../type";
import classes from "./table.module.css";

const columnHelper = createColumnHelper<ITasksType>();
const useTableTask = () => {
  const HEAD_CELLS: IHeadCell<ITasksType> = useMemo(
    () => ({
      id: "ID",
      title: "Booking title",
      author: "Author",
      year: "Year",
      reviews: "Reviews",
      progress: "Reviews distribution",
    }),
    []
  );

  const columns = useMemo(
    () => [
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
          const positive = (reviews.positive / total) * 100;
          const negative = (reviews.negative / total) * 100;

          return (
            <>
              <Group justify="space-between">
                <Text fz="xs" c="teal" fw={700}>
                  {positive.toFixed(0)}%
                </Text>
                <Text fz="xs" c="teal" fw={700}>
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
    ],
    [HEAD_CELLS]
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

  return { columns, dataTasks };
};
export default useTableTask;
