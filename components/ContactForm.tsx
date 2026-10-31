"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/app/actions/getintouch";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send Message"}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, null);

  if (state && "success" in state) {
    return (
      <p className="rounded-lg border border-border bg-muted/50 p-4 text-green-600 dark:text-green-400">
        Thank you! Your message has been sent.
      </p>
    );
  }

  const errors = state && "errors" in state ? state.errors : undefined;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot field — visually hidden from humans, attractive to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" required />
          {errors?.firstName && (
            <p className="text-sm text-destructive">{errors.firstName[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" required />
          {errors?.lastName && (
            <p className="text-sm text-destructive">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {errors?.email && (
          <p className="text-sm text-destructive">{errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input id="contact" name="contact" required />
        {errors?.contact && (
          <p className="text-sm text-destructive">{errors.contact[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
        {errors?.message && (
          <p className="text-sm text-destructive">{errors.message[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
