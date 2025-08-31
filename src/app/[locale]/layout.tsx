"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./globals.css";
import { Toaster } from "sonner";


const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Provider store={store}>
        {children}
      </Provider>

    </QueryClientProvider>

  );
}
