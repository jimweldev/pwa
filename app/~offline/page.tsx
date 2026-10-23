import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Offline",
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="font-medium">You&apos;re offline</h1>
      <p className="text-sm text-muted-foreground">
        Check your connection and try again.
      </p>
    </div>
  )
}
