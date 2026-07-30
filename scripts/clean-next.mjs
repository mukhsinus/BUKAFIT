import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const roots = [".next", ".next-dev", ".next-prod"];

for (const dir of roots) {
  const path = join(process.cwd(), dir);
  if (!existsSync(path)) continue;
  rmSync(path, { recursive: true, force: true });
  console.log(`removed ${dir}/`);
}
