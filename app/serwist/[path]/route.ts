import { spawnSync } from "node:child_process"
import { createSerwistRoute } from "@serwist/turbopack"

// Vercel exposes the commit SHA; fall back to local git, then a random id.
const revision =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  crypto.randomUUID()

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "app/sw.ts",
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
    useNativeEsbuild: true,
  })
