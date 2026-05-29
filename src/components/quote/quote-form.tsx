"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Phone, AlertCircle } from "lucide-react";

import { quoteSchema, type QuoteInput } from "@/lib/schemas/quote";
import {
  site,
  storyOptions,
  windowCountOptions,
  contactMethodOptions,
  quoteServiceOptions,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fieldCls = "h-11 rounded-xl bg-white/70";

/** Label + control + inline error wrapper for consistent, accessible fields. */
function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-tide-600"> *</span>}
      </Label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Pill segmented control for small enum choices. */
function Segmented({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active ? "true" : "false"}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active
                ? "bg-navy-900 text-white shadow-[0_8px_20px_-10px_rgba(11,41,66,0.7)]"
                : "border border-chrome-300 bg-white/70 text-navy-800 hover:border-tide-400 hover:text-tide-700"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      propertyType: "residential",
      stories: "1",
      windows: "unsure",
      services: [],
      contactMethod: "phone",
      message: "",
      company: "",
    },
  });

  // Stamp the start time for the server-side bot timing check.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: QuoteInput) => {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { ok?: boolean; errors?: { fieldErrors?: Record<string, string[]> } } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !json.ok) {
        if (json.errors?.fieldErrors) {
          for (const [key, msgs] of Object.entries(json.errors.fieldErrors)) {
            if (msgs?.[0]) setError(key as keyof QuoteInput, { message: msgs[0] });
          }
        }
        setStatus("error");
        toast.error("We couldn't send that — please try again or call us.");
        return;
      }

      setStatus("success");
      toast.success("Quote request sent! We'll be in touch soon.");
      reset();
    } catch {
      setStatus("error");
      toast.error(`Network error — please call us at ${site.phone.display}.`);
    }
  };

  // ---- Success state ----
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="glass-card flex flex-col items-center p-8 text-center outline-none sm:p-12"
      >
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-tide-100 text-tide-600">
          <CheckCircle2 className="size-9" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-medium text-navy-900">
          Thanks — your request is in!
        </h3>
        <p className="mt-3 max-w-md text-ink-muted">
          We&rsquo;ll review your details and get back to you within one business day with a clear,
          no-pressure estimate. Need us sooner?
        </p>
        <a href={`tel:${site.phone.tel}`} className={cn(buttonVariants({ variant: "gold", size: "lg" }), "mt-6")}>
          <Phone className="size-4" />
          Call {site.phone.display}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-tide-600 hover:text-tide-700"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // ---- Form ----
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-card p-6 sm:p-8">
      {/* honeypot — hidden from real users */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" >
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message} required>
          <Input
            id="name"
            className={fieldCls}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jane Smith"
            {...register("name")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message} required>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            className={fieldCls}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="(513) 555-0123"
            {...register("phone")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            inputMode="email"
            className={fieldCls}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="jane@email.com"
            {...register("email")}
          />
        </Field>

        <Field label="Service address / area" htmlFor="address" error={errors.address?.message} required>
          <Input
            id="address"
            className={fieldCls}
            autoComplete="street-address"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            placeholder="Street or neighborhood"
            {...register("address")}
          />
        </Field>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Property type" htmlFor="propertyType" error={errors.propertyType?.message}>
          <Controller
            control={control}
            name="propertyType"
            render={({ field }) => (
              <Segmented
                ariaLabel="Property type"
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "residential", label: "Residential" },
                  { value: "commercial", label: "Commercial" },
                ]}
              />
            )}
          />
        </Field>

        <Field label="Preferred contact" htmlFor="contactMethod" error={errors.contactMethod?.message}>
          <Controller
            control={control}
            name="contactMethod"
            render={({ field }) => (
              <Segmented
                ariaLabel="Preferred contact method"
                value={field.value}
                onChange={field.onChange}
                options={contactMethodOptions}
              />
            )}
          />
        </Field>

        <Field label="Number of stories" htmlFor="stories" error={errors.stories?.message}>
          <Controller
            control={control}
            name="stories"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} items={[...storyOptions]}>
                <SelectTrigger
                  id="stories"
                  className={cn(fieldCls, "w-full")}
                  aria-invalid={!!errors.stories}
                  aria-describedby={errors.stories ? "stories-error" : undefined}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {storyOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Approx. number of windows" htmlFor="windows" error={errors.windows?.message}>
          <Controller
            control={control}
            name="windows"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} items={[...windowCountOptions]}>
                <SelectTrigger
                  id="windows"
                  className={cn(fieldCls, "w-full")}
                  aria-invalid={!!errors.windows}
                  aria-describedby={errors.windows ? "windows-error" : undefined}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {windowCountOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      {/* Services */}
      <div className="mt-6">
        <Field label="Services needed" htmlFor="services" error={errors.services?.message} required>
          <Controller
            control={control}
            name="services"
            render={({ field }) => (
              <div className="grid gap-2 sm:grid-cols-2">
                {quoteServiceOptions.map((opt) => {
                  const checked = field.value?.includes(opt);
                  return (
                    <label
                      key={opt}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-colors",
                        checked
                          ? "border-tide-400 bg-tide-100/60 text-navy-900"
                          : "border-chrome-300 bg-white/60 text-navy-800 hover:border-tide-300"
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) =>
                          field.onChange(
                            c
                              ? [...(field.value ?? []), opt]
                              : (field.value ?? []).filter((v) => v !== opt)
                          )
                        }
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            )}
          />
        </Field>
      </div>

      {/* Message */}
      <div className="mt-6">
        <Field label="Anything else? (optional)" htmlFor="message" error={errors.message?.message}>
          <Textarea
            id="message"
            rows={4}
            className="rounded-xl bg-white/70"
            placeholder="Gate codes, parking notes, specific windows, timing — anything that helps."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          Something went wrong. Please try again, or call us at{" "}
          <a href={`tel:${site.phone.tel}`} className="font-semibold underline">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
        <Button type="submit" variant="gold" size="xl" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Sending…
            </>
          ) : (
            "Get my free quote"
          )}
        </Button>
        <p className="text-center text-sm text-ink-muted sm:text-left">
          Prefer to talk?{" "}
          <a href={`tel:${site.phone.tel}`} className="font-semibold text-tide-600 hover:text-tide-700">
            Call {site.phone.display}
          </a>
        </p>
      </div>

      {/* polite live region for screen readers */}
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? "Sending your quote request" : ""}
      </p>
    </form>
  );
}
