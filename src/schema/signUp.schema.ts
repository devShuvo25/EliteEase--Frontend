import { z } from "zod";

export const signUpSchema = z.object({
  // Use .min(1) instead of .nonempty() (deprecated)
  name: z.string().min(1, "Name is required."),
  
  email: z.string().email("Please enter a valid email address."),
  
  password: z.string().min(8, "Password must be at least 8 characters long."),
  
  // This approach is "bulletproof" against TS Overload errors
  terms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy.",
    }),
});

// To get the TypeScript type from the schema:
export type SignUpFormData = z.infer<typeof signUpSchema>;