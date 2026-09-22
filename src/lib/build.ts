import { execFileSync } from "node:child_process";

/**
 * The commit this build was produced from.
 *
 * Exists to answer one question that otherwise costs half an hour every time:
 * is the running server actually serving the code I just pushed? Without it,
 * "I deployed and the page is unchanged" is indistinguishable between a build
 * that did not run, a process that was never restarted, a pull that landed on
 * the wrong branch, and a cache. With it, one HTTP request settles it.
 *
 * Read once at module scope, so it is evaluated during `next build` and baked
 * into the output rather than shelled out per request. BUILD_COMMIT in the
 * environment wins, for hosts that build from an archive with no .git.
 */
function read(): string {
  if (process.env.BUILD_COMMIT) return process.env.BUILD_COMMIT.slice(0, 40);
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

export const BUILD_COMMIT = read();
export const BUILT_AT = new Date().toISOString();
