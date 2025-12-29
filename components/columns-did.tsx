"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DIDDisplay } from "@/lib/types";

export const didColumns: ColumnDef<DIDDisplay>[] = [
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
  {
    accessorKey: "area_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Area Code
        </Button>
      );
    },
    cell: ({ row }) => {
      const areaCode = row.getValue("area_code") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={areaCode}
          >
            {areaCode}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Type
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={type}
          >
            {type}
          </div>
        </div>
      );
    }
  }, 
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Region
        </Button>
      );
    },
    cell: ({ row }) => {
      const region = row.getValue("region") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={region}
          >
            {region}
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          City
        </Button>
      );
    },
    cell: ({ row }) => {
      const city = row.getValue("city") as string;
      return (
        <div className="flex items-center min-w-0">
          <div
            className="font-medium text-sm text-left truncate max-w-[180px] pr-2"
            title={city}
          >
            {city}
          </div>
        </div>
      );
    }
  }, 
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return null;
    },
  }
];
