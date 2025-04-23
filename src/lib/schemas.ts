import { z } from "zod";

export const loginSchema = z.object({
    identifier: z.string().min(1, { message: "Enter email or phone number" }).refine((value) => {
        if (value.includes("@")) {
            return z.string().email().safeParse(value).success

        }
        return /^\+?\d{10,15}$/.test(value);
    },
        (value) => ({
            message: value.includes("@") ? "Please enter a valid email address" : "The Phone number is not valid"
        })
    ),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});


export type LoginFormData = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    displayName: z.string().min(1, { message: "Display name is required." }),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    birthMonth: z.string({ required_error: "Please select a month." }),
    birthDay: z.string({ required_error: "Please select a day." }),
    birthYear: z.string({ required_error: "Please select a year." }),
    marketingEmails: z.boolean().default(false).optional(),

})

export type RegisterFromData = z.infer<typeof registerSchema>


export const resetPasswordSchema = z.object({
    email: z.string().min(1, { message: "Email address is required" }).email({ message: "Enter a valid email address" })
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>



export const resetPasswordSubmitSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ResetPasswordSubmitFormData = z.infer<typeof resetPasswordSubmitSchema>;