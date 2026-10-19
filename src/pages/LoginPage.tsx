import ThemeToggle from "../components/ThemeToggle";
import { useState, type SyntheticEvent } from "react";
import {
  signInWithPassword,
  signInWithGoogle,
  signUp,
} from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { FullPageSpinner } from "../components/Spinner";
import { toast } from "sonner";

export default function LoginPage() {
  const { session, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signIn") {
        await signInWithPassword({ email, password });
        toast.success("Signed in");
      } else {
        const { session } = await signUp({ email, password });
        if (!session) setNotice("Check your email to confirm your account.");
        else toast.success("Account created");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (loading) return <FullPageSpinner />;
  if (session) return <Navigate to="/" replace />;

  const submitLabel =
    mode === "signIn"
      ? submitting
        ? "Signing in…"
        : "Sign in"
      : submitting
        ? "Creating account…"
        : "Create account";

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-2xl bg-surface p-8 shadow-lg ring-1 ring-line">
        <h1 className="text-2xl font-bold text-fg-strong">Job Trapper</h1>
        <p className="mt-1 text-sm text-muted">
          {mode === "signIn" ? "Sign in" : "Create an account"} to track your
          applications.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-fg-soft"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-fg placeholder-hint focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-fg-soft"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={
                mode === "signIn" ? "current-password" : "new-password"
              }
              minLength={mode === "signUp" ? 8 : undefined}
              className="block w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-fg placeholder-hint focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-cyan-700 px-4 py-2.5 font-semibold text-white hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitLabel}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {mode === "signIn"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signIn" ? "signUp" : "signIn");
              setError(null);
              setNotice(null);
            }}
            className="cursor-pointer rounded font-medium text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            {mode === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-raised" />
          <span className="text-xs text-subtle uppercase">or</span>
          <span className="h-px flex-1 bg-raised" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-line-strong bg-raised px-4 py-2.5 font-medium text-fg hover:bg-raised-hover focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none cursor-pointer"
        >
          <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 dark:bg-red-950/60 px-3 py-2 text-sm text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-900"
          >
            {error}
          </p>
        )}
        {notice && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 px-3 py-2 text-sm text-cyan-800 dark:text-cyan-300 ring-1 ring-cyan-200 dark:ring-cyan-900"
          >
            {notice}
          </p>
        )}
      </div>
    </main>
  );
}
