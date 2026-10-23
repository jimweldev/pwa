import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { SerwistProvider } from "./serwist-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const APP_NAME = "PWA"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: "A Progressive Web App built with Next.js and Serwist",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  icons: {
    apple: "/icon-192x192.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <SerwistProvider
          swUrl="/serwist/sw.js"
          disable={process.env.NODE_ENV === "development"}
        >
          <ThemeProvider><TooltipProvider>{children}</TooltipProvider></ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  )
}
