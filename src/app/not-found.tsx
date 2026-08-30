import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-32 text-center">
      <p className="mono-label text-graphite mb-4">404</p>
      <h1 className="text-h2 font-display font-bold mb-6">That page isn't in the loop.</h1>
      <Link href="/" className="text-signal hover:underline">
        Back to the homepage →
      </Link>
    </div>
  );
}
