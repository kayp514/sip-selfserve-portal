import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function DidActionPurchase() {
  return (
    <>
      <Button variant="ghost" size="sm">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Buy
      </Button>
    </>
  );
}
