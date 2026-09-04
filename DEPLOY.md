# Deploying to Hostinger

This is a Next.js app, not a static site. It needs a running Node process
(`next start`). Pointing a domain at a folder of files will not serve it.

Node 20.9 or newer is required (Next 16). `package.json` pins this via
`engines`; set the same version in the hPanel app settings.

## Deploy

    git pull
    npm ci
    npm run build     # writes .next/ - must run on the server
    npm start         # next start, honours $PORT

`.next/` is gitignored, so the build has to happen on the server. It is not
uploaded by `git push`.

## Unstyled page: plain serif text, blue underlined links, no layout

The HTML renders but nothing under `/_next/static/` is being served, so the
stylesheet 404s. `X-Content-Type-Options: nosniff` (set in `next.config.ts`)
then makes the browser refuse the stylesheet outright rather than guess at a
response that is really an HTML error page. The header is correct and should
stay; the 404 underneath is the bug.

Confirm which of the two causes it is:

    ls .next/static/chunks/*.css

**Files listed** - the build is fine and the web server in front of Node is
intercepting `/_next/*` and serving it from the document root instead of
proxying it. Fix the routing so every path, `/_next/*` included, reaches the
Node app. Nothing in this repo can fix that.

**Nothing listed, or `.next/` missing** - the build did not finish. Shared
plans usually fail here on memory. Rebuild:

    rm -rf .next
    NODE_OPTIONS=--max-old-space-size=2048 npm run build

Then restart the app and confirm from your own machine:

    curl -sI https://growdigitalbranding.com/_next/static/chunks/<name>.css

A healthy response is `200` with `content-type: text/css`. Anything returning
`text/html` is the failure above.

## Environment variables

`NEXT_PUBLIC_*` values are inlined into the bundle at build time and frozen
there. Changing one in hPanel and restarting does nothing: it needs a rebuild.

Required for the admin dashboard and lead capture:

    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY     # server only, never expose
    MAKE_WEBHOOK_URL              # fallback; the dashboard setting wins
