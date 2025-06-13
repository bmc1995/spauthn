import { z } from "zod";

const LoginFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Invalid email address." })
      .max(100)
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required.", coerce: true })
      .trim()
      .regex(/^[^\s]+$/, "Invalid Password.")
      .min(8, "Invalid Password."),
  })
  .strict()
  .required();

export default LoginFormSchema;

export type LoginForm = z.infer<typeof LoginFormSchema>;
