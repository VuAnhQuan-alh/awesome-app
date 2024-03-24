"use client";

import { memo } from "react";

import { useTemplate } from "@zone/components/context/template.context";
import TableCore from "@zone/components/core/table";

import useTableTask from "./useTable";

const TableCoreMemo = memo(TableCore);

export default function TableTask() {
  const { open } = useTemplate();

  const { columns, dataTasks, HEAD_CELLS } = useTableTask({ open });

  return (
    <TableCoreMemo
      columns={columns}
      data={dataTasks}
      headCells={HEAD_CELLS}
      loading={false}
      title="Someone task for table"
    />
  );
}
