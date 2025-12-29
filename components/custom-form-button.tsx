import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  canSubmit: boolean;
  isSubmitting: boolean;
  submitText: string;
  submittingText: string;
  className?: string;
}

export function FormButton({
  canSubmit,
  isSubmitting,
  submitText,
  submittingText,
  className,
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className={cn("w-full", className)}
    >
      {isSubmitting ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {submittingText}
        </>
      ) : (
        submitText
      )}
    </Button>
  );
}
