import { Suspense } from "react";
import { SubscribersClient } from "@/components/subscribers-client";

export const dynamic = "force-dynamic";

async function Subscribers() {
  return <SubscribersClient data={[]} />;
}

export default function SubscribersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Subscribers />
    </Suspense>
  );
}
