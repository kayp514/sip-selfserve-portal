"use client";

import { didColumns } from "@/components/columns-did";
import type { DIDDisplay } from "@/lib/types";
import { DIDTable } from "@/components/table-did";

interface DIDsClientComponentProps {
  data: DIDDisplay[];
}

export function DIDsClient({ data }: DIDsClientComponentProps) {
  return <DIDTable columns={didColumns} data={data} />;
}
