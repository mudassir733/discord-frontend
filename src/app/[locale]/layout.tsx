"use client"
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Toaster } from "sonner";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700", "300"],
});

const metadata: Metadata = {
  title: "Discord Clone",
  description: "Discord Clone",
};

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}

    </QueryClientProvider>

  );
}
