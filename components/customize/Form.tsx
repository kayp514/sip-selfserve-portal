import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { EmailField, TextField } from "./FieldControl";

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
};

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    EmailField,
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
});

export {
  fieldContext,
  useFieldContext,
  formContext,
  useAppForm,
  withForm,
  useFormContext,
};
