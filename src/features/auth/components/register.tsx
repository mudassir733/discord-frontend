"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

// hooks
import useRegister, { RegisterRequest } from "@/hooks/auth/useRegister"

// ui component
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// validation schema
import { registerSchema, RegisterFromData } from "@/lib/schemas"

export default function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterFromData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            displayName: "",
            username: "",
            password: "",
            birthMonth: "",
            birthDay: "",
            birthYear: "",
            marketingEmails: false,
        },
    })

    const { mutate, error, isPending } = useRegister({
        onSuccess: (data) => {
            Cookies.set("access_token", data.access_token, { expires: 30 });
            router.push("/channels")
            return data;
        },
        onError: (err) => {
            console.log("Registration failed:", err.response?.data?.error);
        },
    });

    const onSubmit = (data: RegisterFromData) => {
        const dateOfBirth = `${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}-${data.birthYear}`;
        const apiData: RegisterRequest = {
            userName: data.username,
            displayName: data.displayName,
            email: data.email,
            password: data.password,
            dateOfBirth: dateOfBirth,
        };
        mutate(apiData);
    };
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ]

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => (currentYear - 13 - i).toString())

    return (
        <section className="w-full h-fit md:h-full bg-[#5865F2] flex items-center justify-center flex-col md:p-0">
            <div className="w-full max-w-[500px] mx-auto p-6 bg-[#2f3136] rounded-md my-6">
                <h1 className="text-2xl font-bold text-white text-center mb-6">Create an account</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#b9bbbe] uppercase text-xs font-bold">
                                        Email <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="bg-[#202225] border-none text-white" />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#b9bbbe] uppercase text-xs font-bold">Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="bg-[#202225] border-none text-white" />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#b9bbbe] uppercase text-xs font-bold">
                                        Username <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="bg-[#202225] border-none text-white" />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#b9bbbe] uppercase text-xs font-bold">
                                        Password <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} className="bg-[#202225] border-none text-white" />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />


                        <div className="space-y-2">
                            <div className="text-[#b9bbbe] uppercase text-xs font-bold">
                                Date of Birth <span className="text-red-500">*</span>
                            </div>
                            <div className="flex items-center gap-5">

                                <FormField
                                    control={form.control}
                                    name="birthMonth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="bg-[#202225] border-none text-white w-[130px]">
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#2f3136] border-[#202225] text-white">
                                                        {months.map((month) => (
                                                            <SelectItem
                                                                key={month.value}
                                                                value={month.value}
                                                                className="focus:bg-[#5865f2] focus:text-white"
                                                            >
                                                                {month.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birthDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="bg-[#202225] border-none text-white w-[100px]">
                                                        <SelectValue placeholder="Day" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#2f3136] border-[#202225] text-white max-h-[200px]">
                                                        {days.map((day) => (
                                                            <SelectItem key={day} value={day} className="focus:bg-[#5865f2] focus:text-white">
                                                                {day}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birthYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="bg-[#202225] border-none text-white w-[100px]">
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#2f3136] border-[#202225] text-white max-h-[200px]">
                                                        {years.map((year) => (
                                                            <SelectItem key={year} value={year} className="focus:bg-[#5865f2] focus:text-white">
                                                                {year}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                        <FormField
                            control={form.control}
                            name="marketingEmails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-[#5865f2] border-[#72767d]"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-[#b9bbbe] text-xs font-normal">
                                            (Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt
                                            out at any time.
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white cursor-pointer">
                            {isPending ? "Registering..." : "Continue"}
                        </Button>
                        <div className="text-center flex items-center justify-center">
                            {error && (
                                <p className="text-red-400 font-semibold">{error?.response?.data?.error}</p>
                            )}
                        </div>
                        <div className="text-xs text-[#b9bbbe] mt-2">
                            By registering, you agree to Discord's{" "}
                            <Link href="#" className="text-[#00a8fc] hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-[#00a8fc] hover:underline">
                                Privacy Policy
                            </Link>

                        </div>
                        <div className="text-sm text-[#00a8fc] hover:underline mt-4">
                            <Link href="/login">Already have an account?</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}
