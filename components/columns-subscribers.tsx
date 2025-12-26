"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Subscriber } from "@/lib/types";

export const subscriberColumns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Username
        </Button>
      );
    },
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title="username"
          >
            {username}
          </div>
        </div>
      );
    },
  },
];
