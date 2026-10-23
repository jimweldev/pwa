"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { DownloadIcon, ShareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const standaloneQuery = "(display-mode: standalone)"

function subscribeStandalone(onChange: () => void) {
  const media = window.matchMedia(standaloneQuery)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function getStandalone() {
  return (
    window.matchMedia(standaloneQuery).matches ||
    ("standalone" in navigator && navigator.standalone === true)
  )
}

const noop = () => () => {}

function getIsIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function InstallButton() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandalone,
    () => false
  )
  const isIOS = useSyncExternalStore(noop, getIsIOS, () => false)

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setInstallEvent(null)

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  async function install() {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  if (isStandalone) return null

  // iOS Safari has no install prompt API; users install via the Share menu.
  if (isIOS) {
    return (
      <div className="flex flex-col gap-2">
        <Button onClick={() => setShowIOSHint((v) => !v)}>
          <DownloadIcon data-icon="inline-start" />
          Download app
        </Button>
        {showIOSHint && (
          <p className="text-xs text-muted-foreground">
            Tap <ShareIcon className="inline size-3.5 align-text-bottom" />{" "}
            Share, then &quot;Add to Home Screen&quot;.
          </p>
        )}
      </div>
    )
  }

  if (!installEvent) return null

  return (
    <Button onClick={install}>
      <DownloadIcon data-icon="inline-start" />
      Download app
    </Button>
  )
}
