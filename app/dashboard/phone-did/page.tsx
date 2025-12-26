import { Suspense } from "react";
import { DIDsClient } from "@/components/did-client";
import { fetcher } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function DIDs() {
    'use server'
  const did = await fetcher(
    "https://sips.lifesprintcare.ca:1443/api/lnpnumbers/"
  );
  return <DIDsClient data={did} />;
}

export default function PhoneDIDPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DIDs />
    </Suspense>
  );
}
