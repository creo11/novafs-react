/**
 * Copies production build to ../deploy/react-app (repo root).
 * Does NOT write into react-app/ source — safe for OneDrive-synced projects.
 *
 * Cloudflare CI can then: cp -r deploy/react-app/* react-app/
 */
import { cpSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(packageRoot, "..");
const distDir = join(packageRoot, "dist");
const deployDir = join(repoRoot, "deploy", "react-app");

rmSync(deployDir, { recursive: true, force: true });
mkdirSync(deployDir, { recursive: true });
cpSync(distDir, deployDir, { recursive: true });

const indexHtml = readFileSync(join(deployDir, "index.html"), "utf8");

if (indexHtml.includes("/src/main.tsx")) {
  console.error(
    "publish-cloudflare: index.html still points at /src/main.tsx — build did not run correctly."
  );
  process.exit(1);
}

if (!indexHtml.includes("/react-app/assets/")) {
  console.error(
    "publish-cloudflare: index.html does not reference /react-app/assets/ — check vite base config."
  );
  process.exit(1);
}

console.log(`publish-cloudflare: output ready at deploy/react-app/`);
