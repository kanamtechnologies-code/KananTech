import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name is required").max(200, "Organization name is too long"),
  message: z.string().min(10, "Please describe what you want to improve (at least 10 characters)").max(1000, "Message is too long"),
  honeypot: z.string().max(0, "Invalid submission"), // Honeypot field should be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

