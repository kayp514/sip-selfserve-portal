"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DIDFilterProps {
  country: string;
  areaCode: string;
  type: string;
  onCountryChange: (value: string) => void;
  onAreaCodeChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  availableAreaCodes: string[];
}

export function DIDFilter({
  country,
  areaCode,
  type,
  onCountryChange,
  onAreaCodeChange,
  onTypeChange,
  onClearFilters,
  availableAreaCodes,
}: DIDFilterProps) {
  const hasActiveFilters = country !== "all" || areaCode !== "all" || type !== "all";

  return (
    <aside className="space-y-6 bg-muted/30 rounded-lg p-6 border h-fit sticky top-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <Select value={country} onValueChange={onCountryChange}>
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area-code" className="text-sm font-medium">
            Area Code
          </Label>
          <Select
            value={areaCode}
            onValueChange={onAreaCodeChange}
            disabled={country === "all" || availableAreaCodes.length === 0}
          >
            <SelectTrigger id="area-code" className="w-full">
              <SelectValue placeholder="Select area code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Area Codes</SelectItem>
              {availableAreaCodes.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium">
            Type
          </Label>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="NATIONAL">Local</SelectItem>
              <SelectItem value="TOLL_FREE">Toll Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}
