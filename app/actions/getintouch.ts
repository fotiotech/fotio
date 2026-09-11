"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema } from "../shema/getintouch";

export type ContactState =
  | {
      success: true;
    }
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

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
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
