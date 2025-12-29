import { Suspense } from "react";
import { DIDsClient } from "@/components/did-client";
import { listDIDs } from "@/app/action";

export const dynamic = "force-dynamic";

async function DIDs() {
  const did = await listDIDs();
  return <DIDsClient data={did.data || []} />;
}

export default function PhoneDIDPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DIDs />
    </Suspense>
  );
}
