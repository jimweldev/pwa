import { InstallButton } from "@/components/install-button"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <InstallButton />
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
