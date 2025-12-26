"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DID } from "@/lib/types";

export const didColumns: ColumnDef<DID>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Phone Number
        </Button>
      );
    },
    cell: ({ row }) => {
      const did = row.getValue("number") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={did}
          >
            {did}
          </div>
        </div>
      );
    },
  },
];
