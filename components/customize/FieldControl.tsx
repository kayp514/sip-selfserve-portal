import React from "react";

import {
  Field as FieldCn,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "./Form";

export interface FieldProps {
  field?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface PasswordFieldProps extends FieldProps {
  onForgotPassword?: () => void;
}

export interface OTPFieldProps extends FieldProps {
  length?: number;
  onResendCode?: React.MouseEventHandler;
  isLoading?: boolean;
}

const TernFieldErrors = () => {
  const field = useFieldContext<string>();
  const meta = field.state.meta as { errors: string[] };
  const errors = meta.errors;

  if (!errors || errors.length === 0) return null;

  const formattedErrors = errors.map((error) => ({ message: error }));

  return <FieldError errors={formattedErrors} />;
};

const TextField = ({ label, placeholder, disabled, required }: FieldProps) => {
  const field = useFieldContext<string>();

  return (
    <FieldCn>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      <TernFieldErrors />
    </FieldCn>
  );
};

const EmailField = ({ label, placeholder, disabled, required }: FieldProps) => {
  const field = useFieldContext<string>();

  return (
    <FieldCn>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        id={field.name}
        name={field.name}
        type="email"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      <TernFieldErrors />
    </FieldCn>
  );
};

export { TextField, EmailField, TernFieldErrors };
