"use server";

import GetInTouch from "@/models/Getintouch";
import { connection } from "@/utils/connection";
import { revalidatePath } from "next/cache";
import { z } from "zod"; // optional, but recommended for validation

// Define a validation schema using Zod (install if not present: npm install zod)
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact number is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContactForm(formData: FormData) {
  // Extract raw data from FormData
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    contact: formData.get("contact") as string,
    message: formData.get("message") as string,
  };

  // Validate the data
  const result = formSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const validatedData = result.data;

  try {
    // Ensure database connection
    await connection();

    // Create and save the document
    const newEntry = new GetInTouch(validatedData);
    await newEntry.save();

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error saving contact form:", error);
    return {
      success: false,
      errors: { _form: "Something went wrong. Please try again later." },
    };
  }
}

export async function deleteSubmission(id: string) {
  await connection();
  await GetInTouch.findByIdAndDelete(id);
  //   revalidatePath("/admin/getintouch");
}
