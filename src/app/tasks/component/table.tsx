"use client";

import { TableCore } from "@zone/components/core";

import { ITasksType } from "../type";
import useTableTask from "./useTable";

export default function TableTask() {
  const { columns, dataTasks, HEAD_CELLS } = useTableTask();

  return (
    <TableCore<ITasksType>
      title="Someone task for table"
      loading={false}
      columns={columns}
      data={dataTasks}
      headCells={HEAD_CELLS}
    />
  );
}
