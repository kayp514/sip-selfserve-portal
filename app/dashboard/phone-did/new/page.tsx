"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper, PageHeader } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/custom-form-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { listCarrier, importDID } from "@/app/action";
import type { Carrier } from "@/lib/types";

export default function ImportDIDPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  const [formData, setFormData] = useState({
    number: "",
    carrierId: "",
    type: "NATIONAL" as "NATIONAL" | "TOLL_FREE",
    countryCode: "",
    areaCode: "",
    region: "",
    city: "",
    externalId: "",
    monthlyCost: "",
    salePrice: "",
    sms: true,
    voice: true,
    mms: false,
  });

  useEffect(() => {
    async function fetchCarriers() {
      const result = await listCarrier();
      if (result.success && result.data) {
        setCarriers(result.data);
      }
    }
    fetchCarriers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await importDID({
        number: formData.number,
        carrierId: formData.carrierId,
        type: formData.type,
        countryCode: formData.countryCode || undefined,
        areaCode: formData.areaCode || undefined,
        region: formData.region || undefined,
        city: formData.city || undefined,
        externalId: formData.externalId || undefined,
        monthlyCost: formData.monthlyCost
          ? parseFloat(formData.monthlyCost)
          : undefined,
        salePrice: formData.salePrice
          ? parseFloat(formData.salePrice)
          : undefined,
        capabilities: {
          sms: formData.sms,
          voice: formData.voice,
          mms: formData.mms,
        },
      });

      if (result.success) {
        router.push("/dashboard/phone-did");
      } else {
        console.error("Failed to import DID:", result.error);
      }
    } catch (error) {
      console.error("Failed to import DID:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.number && formData.carrierId;

  return (
    <PageWrapper>
      <PageHeader
        title="Import DID"
        actions={
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Required Information</CardTitle>
            <CardDescription>Essential details for the DID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">Phone Number *</Label>
              <Input
                id="number"
                placeholder="+12125551234"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier *</Label>
              <Select
                value={formData.carrierId}
                onValueChange={(value) =>
                  setFormData({ ...formData, carrierId: value })
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="carrier">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carriers.map((carrier) => (
                    <SelectItem key={carrier.id} value={carrier.id}>
                      {carrier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Number Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as "NATIONAL" | "TOLL_FREE",
                  })
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NATIONAL">National</SelectItem>
                  <SelectItem value="TOLL_FREE">Toll Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Information</CardTitle>
            <CardDescription>
              Location details (optional for toll-free)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryCode">Country Code</Label>
                <Input
                  id="countryCode"
                  placeholder="1"
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaCode">Area Code</Label>
                <Input
                  id="areaCode"
                  placeholder="212"
                  value={formData.areaCode}
                  onChange={(e) =>
                    setFormData({ ...formData, areaCode: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region/State</Label>
                <Input
                  id="region"
                  placeholder="New York"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Integration</CardTitle>
            <CardDescription>
              Cost and carrier integration details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="externalId">External ID</Label>
              <Input
                id="externalId"
                placeholder="Carrier's internal ID"
                value={formData.externalId}
                onChange={(e) =>
                  setFormData({ ...formData, externalId: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyCost">Monthly Cost</Label>
                <Input
                  id="monthlyCost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.monthlyCost}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyCost: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.salePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, salePrice: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>Capabilities</CardTitle>
            <CardDescription>
              Available features for this number
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sms"
                checked={formData.sms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, sms: checked as boolean })
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="sms" className="cursor-pointer">
                SMS
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="voice"
                checked={formData.voice}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, voice: checked as boolean })
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="voice" className="cursor-pointer">
                Voice
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mms"
                checked={formData.mms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, mms: checked as boolean })
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="mms" className="cursor-pointer">
                MMS
              </Label>
            </div>
          </CardContent>
        </Card>

        <FormButton
          canSubmit={!!canSubmit}
          isSubmitting={isSubmitting}
          submitText="Import DID"
          submittingText="Importing..."
        />
      </form>
    </PageWrapper>
  );
}
