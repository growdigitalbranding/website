import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm surface rounded-3xl p-8">
        <p className="mono-label text-graphite mb-2">Grow</p>
        <h1 className="font-display font-bold text-2xl mb-6">Lead inbox</h1>
        <LoginForm />
      </div>
    </div>
  );
}
