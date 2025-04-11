import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
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