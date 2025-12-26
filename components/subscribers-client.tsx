"use client";

import { subscriberColumns } from "./columns-subscribers";
import type { Subscriber } from "@/lib/types";
import { SubscribersTable } from "./table-subscribers";

interface SubscribersClientProps {
  data: Subscriber[];
}

export function SubscribersClient({ data }: SubscribersClientProps) {
  return <SubscribersTable columns={subscriberColumns} data={data} />;
}
