import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const [mode = "dev", ...rest] = process.argv.slice(2);

const env = { ...process.env };
// Keep `next build` / `next start` on `.next` (Netlify/Vercel-compatible).
// Point only `next dev` at a separate folder so builds cannot clobber the live
// dev cache (root cause of 500 + `_next/static` 404 while both run).
if (mode === "dev") {
  env.BUKAFIT_DIST_DIR = ".next-dev";
}

const child = spawn(process.execPath, [nextBin, mode, ...rest], {
  stdio: "inherit",
  env,
  cwd: process.cwd(),
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
