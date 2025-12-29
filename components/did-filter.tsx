import { Label } from "@/components/ui/label";

export function DIDFilter() {
  return (
    <div className="space-y-4 bg-muted/30 rounded-lg p-4 border">
      <div className="space-y-2">
        <Label htmlFor="country" className="text-sm font-medium">
          Country
        </Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="area-code" className="text-sm font-medium">
          Area Code
        </Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="type" className="text-sm font-medium">
          Type
        </Label>
      </div>
    </div>
  );
}
