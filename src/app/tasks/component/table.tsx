"use client";

import { TableCore } from "@zone/components/core";

import { ITasksType } from "../type";
import useTableTask from "./useTable";

export default function TableTask() {
  const { columns, dataTasks, HEAD_CELLS } = useTableTask();

  return (
    <TableCore<ITasksType>
      columns={columns}
      data={dataTasks}
      headCells={HEAD_CELLS}
      loading={false}
      title="Someone task for table"
    />
  );
}
