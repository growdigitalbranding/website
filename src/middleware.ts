import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Guards /admin and keeps the Supabase session fresh.
 *
 * The dashboard holds real people's names and phone numbers. An unauthenticated
 * /admin would put that behind nothing but an unguessed URL, so the check runs
 * here at the edge rather than in each page: a page that forgets to check is
 * then still protected.
 *
 * RLS is the real boundary — this only decides who gets shown a page at all.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Unconfigured deploy: send /admin to a page that explains what is missing
  // rather than crashing with a stack trace.
  if (!url || !anonKey) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const setup = request.nextUrl.clone();
      setup.pathname = "/admin/setup";
      if (request.nextUrl.pathname !== "/admin/setup") {
        return NextResponse.redirect(setup);
      }
    }
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser, not getSession: it revalidates the token with Supabase instead of
  // trusting a cookie the browser could have edited.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (pathname.startsWith("/admin") && !user && !isLogin && pathname !== "/admin/setup") {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    // Come back to where they were headed once signed in.
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (isLogin && user) {
    const dash = request.nextUrl.clone();
    dash.pathname = "/admin";
    dash.search = "";
    return NextResponse.redirect(dash);
  }

  return response;
}

export const config = {
  // Only /admin needs a session check. Running this on the marketing pages
  // would add a Supabase round trip to every visit for no benefit.
  matcher: ["/admin/:path*"],
};
