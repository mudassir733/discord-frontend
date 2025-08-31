"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// validation schema
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/schemas'

// hooks
import useResetPassword, { ResetPasswordRequest } from '@/hooks/auth/useResetPassword';

// assets
import QrCodeImg from "@/assets/images/Qr.svg"

// ui component
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"


const ResetPassword = () => {

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate, error, isPending } = useResetPassword({
        onSuccess: (data) => {
            console.log("Success", data)
            toast.success("Email has been sent successfully", {
                description: data?.message,
            })
            return data
        },
        onError: (error) => {
            console.log("Error", error.message)
            toast.error("Error occurred", {
                description: error?.response?.data?.error || error.message,
            })
            throw new Error(error.message)
        }
    })


    const onSubmit = (data: ResetPasswordFormData) => {
        const payload: ResetPasswordRequest = {
            email: data.email,
        }
        mutate(payload);
        form.setValue("email", "")
    };
    return (
        <div className='w-full h-fit md:h-screen bg-[#5865F2] bg-cover bg-center bg-no-repeat flex items-center justify-center flex-col p-4 md:p-0'>
            <div className='flex flex-col md:w-[800px] w-full h-fit bg-[#36393F] p-10 shadow-lg rounded-md'>
                <section className='flex flex-col md:flex-row items-center gap-14'>
                    <div className='md:flex-2 w-full'>
                        <div className='text-center pb-6'>
                            <h2 className='text-[25px] !text-white'>Reset Your Password!</h2>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email or Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='w-full mt-3'>
                                    <Button type='submit' variant={"blueBtn"} size={"loginBtn"} className='w-full rounded-none py-3'>{isPending ? "Sending..." : "Reset Password"}</Button>
                                </div>
                                <div className="text-center flex items-center justify-center">
                                    {error && (
                                        <p className="text-red-400 font-semibold">{error?.response?.data?.error}</p>
                                    )}
                                </div>
                                <div className=' mt-3 flex gap-2'>
                                    <span className='text-[#A3A6AA] text-sm'>Need An Account?</span>
                                    <Link className='text-[#00AFF4] text-sm hover:underline' href="/en/register">Register</Link>
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className='flex-1'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='p-2 bg-[#fff] rounded-sm'>
                                <Image src={QrCodeImg} alt='QR code image' />
                            </div>
                            <h2 className='text-[25px] text-center pt-2 !text-white'>Log in with QR Code</h2>
                            <p className='text-[#A3A6AA] text-center text-sm'>Scan this with the Scan this with the app to log in instantly.</p>
                        </div>
                    </div>

                </section>
            </div>
        </div >
    )
}


export default ResetPassword