"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// validation schema
import { loginSchema, LoginFormData } from '@/lib/schemas'

// hooks
import useLogin, { LoginRequest } from '@/hooks/auth/useLogin';

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


const login = () => {
    const router = useRouter()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const { mutate, error, isPending } = useLogin({
        onSuccess: (data) => {
            Cookies.set("access_token", data.access_token, { expires: 30 })
            router.push("/channels/me")
            return data;
        },
        onError: (err) => {
            console.log(err.response?.data?.error)
        }
    })

    const onSubmit = (data: LoginFormData) => {
        const dataToSend: LoginRequest = {
            identifier: data.identifier,
            password: data.password
        }

        mutate(dataToSend)
    };
    return (
        <div className='w-full h-fit md:h-screen bg-[#5865F2] bg-cover bg-center bg-no-repeat flex items-center justify-center flex-col p-4 md:p-0'>
            <div className='flex flex-col md:w-[800px] w-full h-fit bg-[#36393F] p-10 shadow-lg rounded-md'>
                <section className='flex flex-col md:flex-row items-center gap-14'>
                    <div className='md:flex-2 w-full'>
                        <div className='text-center pb-6'>
                            <h2 className='text-[25px] !text-white'>Welcom back!</h2>
                            <p className='text-[#A3A6AA]'>We're so excited to see you again!</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="identifier"
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
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className=' mt-1'>
                                    <Link href="/password-reset" className='text-[#00AFF4] text-sm hover:underline'>Forgot your password?</Link>
                                </div>
                                <div className='w-full mt-3'>
                                    <Button type='submit' variant={"blueBtn"} size={"loginBtn"} className='w-full rounded-none py-3'>{isPending ? "Login in..." : "Login"}</Button>
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


export default login