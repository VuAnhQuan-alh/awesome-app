"use client";

import { useTemplate } from "@zone/components/context/template.context";
import TableCore from "@zone/components/core/table";

import { ITasksType } from "../type";
import useTableTask from "./useTable";

export default function TableTask() {
  const context = useTemplate();
  const { columns, dataTasks, HEAD_CELLS } = useTableTask({
    open: context.open,
  });

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
