"use client";

import { didColumns } from "./columns-did";
import type { DID } from "@/lib/types";
import { DIDTable } from "./table-did";

interface DidClientComponentProps {
  data: DID[];
}

export function DIDsClient({ data }: DidClientComponentProps) {
  return <DIDTable columns={didColumns} data={data} />;
}
