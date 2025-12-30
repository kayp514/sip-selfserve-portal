"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
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
import { useState, useMemo } from "react";

interface DIDTableProps {
  columns: ColumnDef<DIDDisplay>[];
  data: DIDDisplay[];
}

export function DIDTable({ columns, data }: DIDTableProps) {
  const router = useRouter();
  const [country, setCountry] = useState<string>("all");
  const [areaCode, setAreaCode] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  // Get available area codes based on selected country
  const availableAreaCodes = useMemo(() => {
    if (country === "all") return [];
    
    const codes = data
      .filter((item) => item.countryCode === country)
      .map((item) => item.areaCode)
      .filter((code): code is string => Boolean(code));
    
    return Array.from(new Set(codes)).sort();
  }, [country, data]);

  // Reset area code when country changes
  const handleCountryChange = (value: string) => {
    setCountry(value);
    setAreaCode("all");
  };

  const handleClearFilters = () => {
    setCountry("all");
    setAreaCode("all");
    setType("all");
  };

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCountry = country === "all" || item.countryCode === country;
      const matchesAreaCode = areaCode === "all" || item.areaCode === areaCode;
      const matchesType = type === "all" || item.type === type;
      
      return matchesCountry && matchesAreaCode && matchesType;
    });
  }, [data, country, areaCode, type]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <DIDFilter
          country={country}
          areaCode={areaCode}
          type={type}
          onCountryChange={handleCountryChange}
          onAreaCodeChange={setAreaCode}
          onTypeChange={setType}
          onClearFilters={handleClearFilters}
          availableAreaCodes={availableAreaCodes}
        />
        <div className="rounded-lg border bg-card overflow-hidden">
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
                          <TableCell
                            key={cell.id}
                            className="px-2 py-3 align-top"
                          >
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
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <EmptySpace />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageWrapper>
  );
}
