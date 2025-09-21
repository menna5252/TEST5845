import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().nonempty("Password is required").min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const registerSchema = z
  .object({
    name: z.string().nonempty("Name is required").min(3, {
      message: "Name must be at least 3 characters long",
    }),
    email: z.email({
      message: "Please enter a valid email address",
    }),
    password: z.string().nonempty("Password is required").min(6, {
      message: "Password must be at least 6 characters long",
    }),
    rePassword: z.string().nonempty("Password is required").min(6, {
      message: "Password must be at least 6 characters long",
    }),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^(010|011|012|015)[0-9]{8}$/, {
        message: "Phone number must be 10 digits",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const updatePassSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required")
      .min(6, {
        message: "Current password must be at least 6 characters long",
      }),
    password: z.string().nonempty("New password is required").min(6, {
      message: "New password must be at least 6 characters long",
    }),
    rePassword: z.string().nonempty("confirm password is required").min(6, {
      message: "confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const addressSchema = z.object({
  details: z.string().nonempty("Details is required").min(3, {
    message: "Details must be at least 3 characters long",
  }),
  city: z.string().nonempty("City is required").min(3, {
    message: "City must be at least 3 characters long",
  }),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^(010|011|012|015)[0-9]{8}$/, {
      message: "Phone number must be 11 digits and start with 010/011/012/015",
    }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required",
  }),
});

export const forgetPassSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});
export const resetCodeSchema = z.object({
  resetCode: z.string().nonempty({
    message: "Code is required",
  }),
});

export const resetPassSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  newPassword: z.string().nonempty("Password is required").min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const updateDataSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }).optional(),
  email: z.email({
    message: "Please enter a valid email address",
  }).optional(),
  phone: z
    .string()
    .regex(/^(010|011|012|015)[0-9]{8}$/, {
      message: "Phone number must be 10 digits",
    }).optional(),
});
