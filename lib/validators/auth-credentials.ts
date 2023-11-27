import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 6 characters long" }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
