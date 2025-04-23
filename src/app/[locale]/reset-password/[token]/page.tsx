"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useResetPasswordVerify } from "@/hooks/auth/useResetPasswordVerify";
import { useResetPasswordSubmit } from "@/hooks/auth/useResetPasswordSubmit";
import { resetPasswordSubmitSchema, ResetPasswordSubmitFormData } from "@/lib/schemas";



import forgetPassword from "@/assets/images/forgetPass.jpg"
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
import Image from "next/image";


export default function ResetPasswordPage() {
    const router = useRouter();
    const { token } = useParams();
    console.log("Token", token);

    const form = useForm<ResetPasswordSubmitFormData>({
        resolver: zodResolver(resetPasswordSubmitSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    console.log("Hello wor")


    const { data: verifyData, error: verifyError, isLoading: isVerifying } = useResetPasswordVerify(token as string);


    const { mutate: submitPassword, isPending: isSubmitting } = useResetPasswordSubmit({
        onSuccess: () => {
            toast.success("Password reset successfully", {
                description: "You can now log in with your new password.",
            });
            router.push("/en/login");
        },
        onError: (error) => {
            toast.error("Error resetting password", {
                description: error.response?.data?.error || error.message,
            });

            console.log("Error resetting password", error.response?.data?.error);
        },
    });


    useEffect(() => {
        if (verifyError) {
            toast.error("Invalid or expired token", {
                description: verifyError.response?.data?.error || verifyError.message,
            });
            router.push("/en/login");

            console.log("Error resetting password verify", verifyError.response?.data?.error);
        }
    }, [verifyError, router]);


    const onSubmit = (data: ResetPasswordSubmitFormData) => {
        if (verifyData?.userId) {
            submitPassword({ token: token as string, password: data.newPassword, userId: verifyData.userId });
        }
    };

    if (isVerifying) {
        return <div>Loading...</div>;
    }

    if (verifyError) {
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-indigo-600 bg-cover bg-center bg-no-repeat flex items-center justify-center flex-col p-4 md:p-8">
            <div className="text-center pb-6">
                <h2 className="text-2xl md:text-3xl text-white font-bold">Enter Your New Password</h2>
            </div>
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-[#36393F] p-8 md:p-10 shadow-lg rounded-md gap-8">
                <div className="flex-1 w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full mt-3'>
                                <Button type='submit' variant={"blueBtn"} size={"loginBtn"} className='w-full rounded-none py-3'>{isSubmitting ? "Submitting" : "Reset password"}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="flex-1 w-full flex flex-col items-center justify-center">
                    <div className="bg-white rounded-sm">
                        <Image src={forgetPassword} alt="QR code image" width={300} height={300} />
                    </div>
                </div>
            </div>
        </div>
    );
}