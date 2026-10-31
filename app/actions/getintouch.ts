"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema } from "../shema/getintouch";

export type ContactState =
  | { success: true }
  | {
      errors: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        contact?: string[];
        message?: string[];
      };
    }
  | null;

// Simple in-memory rate limiter (per email + client IP). For a single-instance
// deployment this is sufficient; scale-out deployments should use a shared store.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 3;
const attempts = new Map<string, number[]>();

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return h.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  attempts.set(key, recent);
  if (recent.length >= RATE_MAX_REQUESTS) return true;
  recent.push(now);
  return false;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — real users never see/fill this hidden field.
  if (formData.get("website")) {
    return { success: true };
  }

  const email = String(formData.get("email") ?? "");
  const key = `${email.trim().toLowerCase()}|${await clientIp()}`;
  if (isRateLimited(key)) {
    return {
      errors: {
        email: ["Too many messages. Please wait a minute and try again."],
      },
    };
  }

  const validated = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    contact: formData.get("contact"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const payload = await getPayload({ config });
  await payload.create({
    collection: "get-in-touch",
    data: validated.data,
  });

  return { success: true };
}
