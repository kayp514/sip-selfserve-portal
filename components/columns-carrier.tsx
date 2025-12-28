"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Carrier } from "@/lib/types";

export const carrierColumns: ColumnDef<Carrier>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={name}
          >
            {name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Prefix
        </Button>
      );
    },
    cell: ({ row }) => {
      const prefix = row.getValue("prefix") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={prefix}
          >
            {prefix}
          </div>
        </div>
      );
    },
  },
];