"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { DIDDisplay } from "@/lib/types";
import { PageWrapper, PageHeader } from "@/components/page-layout";
import { EmptySpace } from "@/components/empty-space";
import { DIDFilter } from "@/components/did-filter";
import { DidActionPurchase } from "@/components/did-action-cell";

interface DIDTableProps {
  columns: ColumnDef<DIDDisplay>[];
  data: DIDDisplay[];
}

export function DIDTable({ columns, data }: DIDTableProps) {
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper>
      <PageHeader
        title="DIDs"
        actions={
          <Button onClick={() => router.push("/dashboard/phone-did/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Import DID
          </Button>
        }
      />
      <DIDFilter />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "actions") {
                    return (
                      <TableCell key={cell.id} className="px-2 py-3 align-top">
                        <DidActionPurchase />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-2 py-3 ${
                        cell.column.id === "did" ? "max-w-[200px]" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <EmptySpace />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </PageWrapper>
  );
}
