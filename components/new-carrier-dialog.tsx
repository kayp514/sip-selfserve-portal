import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/custom-form-button";
import { useAppForm } from "@/components/customize/Form";
import { createCarrier } from "@/app/action";

type CreateCarrierFormValues = {
  name: string;
  prefix?: string;
};

export function NewCarrier() {
  const defaultValues: CreateCarrierFormValues = {
    name: "",
    prefix: "",
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmitAsync: ({ value }) => {
        return createCarrier(value.name, value.prefix || "");
      },
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register Carrier</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carrier Registration</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col gap-7"
        >
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <>
                <form.AppField name="name">
                  {(field) => (
                    <field.TextField
                      label="Carrier Name"
                      placeholder="Enter carrier name"
                      disabled={isSubmitting}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="prefix">
                  {(field) => (
                    <field.TextField
                      label="Carrier Prefix"
                      placeholder="Enter carrier prefix"
                      disabled={isSubmitting}
                    />
                  )}
                </form.AppField>

                <FormButton
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                  submitText="Register Carrier"
                  submittingText="Registering..."
                />
              </>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
