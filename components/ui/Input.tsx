import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      <span className="font-medium text-smoke">{label}</span>
      <input
        id={inputId}
        className={cn(
          "min-h-11 rounded-sm border bg-graphite px-3 text-smoke placeholder:text-smoke-muted/70",
          error ? "border-danger" : "border-line focus:border-brass",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {hint && !error ? (
        <span id={`${inputId}-hint`} className="text-xs text-smoke-muted">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${inputId}-error`} className="text-xs text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
