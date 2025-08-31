
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group relative flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 w-[var(--toast-width)] max-w-[400px] font-sans",

          success:
            "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300 [--normal-bg:var(--green-500)] [--normal-text:var(--white-500)] dark:[--normal-text:var(--white-500)] [--normal-border:var(--green-500)]",

          error:
            "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300 [--normal-bg:var(--red-500)] [--normal-text:var(--red-700)] dark:[--normal-text:var(--red-300)] [--normal-border:var(--red-500)]",

          info:
            "bg-[#6A66D2] border-blue-500/20 text-white dark:text-white [--normal-bg:var(--blue-500)] [--normal-text:var(--blue-700)] dark:[--normal-text:var(--blue-300)] [--normal-border:var(--blue-500)]",

          title: "text-lg font-semibold text-white",
          description: "text-sm text-[#fff] dark:text-[#fff]",

          icon: "w-5 h-5",
          closeButton: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full",

        },

        duration: 12000,

        style: {

          background: "var(--normal-bg)",
          color: "var(--normal-text)",
          border: "1px solid var(--normal-border)",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "#fff",
          "--normal-border": "var(--border)",
          // Define color variables for toast types
          "--white-500": "#fff", // Tailwind white-500
          "--green-500": "#22c55e", // Tailwind green-500
          "--red-500": "#ef4444", // Tailwind red-500
          "--blue-500": "#111", // Tailwind blue-500
          "--green-700": "#15803d", // Tailwind green-700
          "--red-700": "#b91c1c", // Tailwind red-700
          "--blue-700": "#1d4ed8", // Tailwind blue-700
          "--green-300": "#86efac", // Tailwind green-300 (dark mode)
          "--red-300": "#f87171", // Tailwind red-300 (dark mode)
          "--blue-300": "#ffffff", // Tailwind blue-300 (dark mode)
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }