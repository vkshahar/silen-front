"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-purple-200 group-[.toaster]:shadow-lg group-[.toaster]:ring-1 group-[.toaster]:ring-purple-100",
          description: "group-[.toast]:text-slate-900",
          actionButton:
            "group-[.toast]:bg-purple-600 group-[.toast]:text-white group-[.toast]:hover:bg-purple-700",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-700 group-[.toast]:hover:bg-slate-200",
          success:
            "group-[.toast]:bg-white group-[.toast]:text-slate-900 group-[.toast]:border-green-200 group-[.toast]:ring-1 group-[.toast]:ring-green-100 [&>svg]:text-purple-400",
          error:
            "group-[.toast]:bg-white group-[.toast]:text-slate-900 group-[.toast]:border-red-200 group-[.toast]:ring-1 group-[.toast]:ring-red-100",
          warning:
            "group-[.toast]:bg-white group-[.toast]:text-slate-900 group-[.toast]:border-yellow-200 group-[.toast]:ring-1 group-[.toast]:ring-yellow-100",
        },
      }}
      {...props}
    />
  )
}

export { Toaster } 