"use client";

import { carrierColumns } from "./columns-carrier";
import type { Carrier } from "@/lib/types";
import { CarrierTable } from "./table-carrier";

interface CarrierClientComponentProps {
  data: Carrier[];
}

export function CarrierClient({ data }: CarrierClientComponentProps) {
  return <CarrierTable columns={carrierColumns} data={data} />;
}
