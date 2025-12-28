import { listCarrier } from "@/app/action";
import { CarrierClient } from "@/components/carrier-client";
import { Suspense } from "react";

async function Carriers() {
  const carriers = await listCarrier();
  return <CarrierClient data={carriers.data || []} />;
}

export default function CarrierPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Carriers />
    </Suspense>
  );
}
