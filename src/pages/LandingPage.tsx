import type { ReactNode } from "react";
import { Link } from "react-router";
import dashboardDark from "../assets/dashboard-dark.png";
import dashboardLight from "../assets/dashboard-light.png";
import Logo from "../components/Logo";
import StatusBadge from "../components/StatusBadge";
import ThemeToggle from "../components/ThemeToggle";
import type { ApplicationStatus } from "../types/applications";

const focusRing =
  "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none";

const primaryButton = `inline-flex items-center justify-center rounded-lg bg-cyan-700 font-semibold text-white shadow-sm hover:bg-cyan-600 ${focusRing}`;

const secondaryButton = `inline-flex items-center justify-center rounded-lg border border-line-strong font-medium text-fg hover:bg-raised ${focusRing}`;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const FEATURES: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "A clear pipeline",
    text: "Move each application from Wishlist to Offer, and see at a glance where everything stands.",
    icon: (
      <svg {...iconProps} className="h-5 w-5">
        <path d="m3 17 2 2 4-4" />
        <path d="m3 7 2 2 4-4" />
        <path d="M13 6h8" />
        <path d="M13 12h8" />
        <path d="M13 18h8" />
      </svg>
    ),
  },
  {
    title: "The full history",
    text: "Every status change is recorded automatically, so you can see how each application got where it is.",
    icon: (
      <svg {...iconProps} className="h-5 w-5">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    title: "Filter and sort",
    text: "Focus on what matters now: filter by status, sort by date, and bookmark the view.",
    icon: (
      <svg {...iconProps} className="h-5 w-5">
        <path d="M3 6h18" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    title: "Private by default",
    text: "Your applications are visible only to you, enforced by the database itself.",
    icon: (
      <svg {...iconProps} className="h-5 w-5">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const MAIN_PATH: ApplicationStatus[] = [
  "wishlist",
  "applied",
  "interviewing",
  "offer",
];
const OTHER_OUTCOMES: ApplicationStatus[] = [
  "rejected",
  "withdrawn",
  "ghosted",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only rounded-lg bg-surface px-4 py-2 font-medium text-fg-strong ring-2 ring-cyan-400 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-20 border-b border-line bg-page/80 backdrop-blur">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        >
          <Link to="/" className={`rounded-lg ${focusRing}`}>
            <Logo />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className={`hidden px-3 py-1.5 text-sm sm:inline-flex ${secondaryButton}`}
            >
              Sign in
            </Link>
            <Link
              to="/login?mode=signup"
              className={`px-3 py-1.5 text-sm ${primaryButton}`}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24">
          <p className="inline-flex items-center rounded-full bg-raised px-3 py-1 text-sm font-medium text-muted ring-1 ring-line">
            Job application tracker
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance text-fg-strong sm:text-5xl lg:text-6xl">
            Catch every opportunity.{" "}
            <span className="text-cyan-700 dark:text-cyan-400">
              Track every application.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted">
            Job Trapper keeps your job search in one place: every application,
            its status and its history, from the first wishlist entry to the
            offer.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/login?mode=signup"
              className={`w-full px-6 py-3 sm:w-auto ${primaryButton}`}
            >
              Get started, it's free
            </Link>
            <Link
              to="/login"
              className={`w-full px-6 py-3 sm:w-auto ${secondaryButton}`}
            >
              I have an account
            </Link>
          </div>
          <p className="mt-4 text-sm text-subtle">
            Sign in with Google or with email.
          </p>
        </section>

        {/* Screenshot */}
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          {/* One screenshot per theme. The theme is a class on <html>, so a
              <picture> media query can't follow the toggle; dark:hidden can.
              loading="lazy" means the hidden one is never downloaded. */}
          <figure className="overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-line">
            <img
              src={dashboardLight}
              width={1432}
              height={990}
              loading="lazy"
              alt="The Job Trapper dashboard: application cards with status badges, an open status timeline, filter pills and a sort control."
              className="h-auto w-full dark:hidden"
            />
            <img
              src={dashboardDark}
              width={1583}
              height={1039}
              loading="lazy"
              alt="The Job Trapper dashboard: application cards with status badges, an open status timeline, filter pills and a sort control."
              className="hidden h-auto w-full dark:block"
            />
          </figure>
        </section>

        {/* Pipeline */}
        <section
          aria-labelledby="pipeline-heading"
          className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6"
        >
          <h2
            id="pipeline-heading"
            className="text-2xl font-bold tracking-tight text-fg-strong sm:text-3xl"
          >
            From wishlist to offer
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted">
            Every application moves through the same clear stages, so you always
            know what needs your attention next.
          </p>
          <ol className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {MAIN_PATH.map((status, index) => (
              <li key={status} className="flex items-center gap-2">
                <StatusBadge status={status} />
                {index < MAIN_PATH.length - 1 && (
                  <svg {...iconProps} className="h-4 w-4 text-subtle">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-subtle">
            <span>or end as</span>
            {OTHER_OUTCOMES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          aria-labelledby="features-heading"
          className="mx-auto max-w-6xl px-4 pb-20 sm:px-6"
        >
          <h2
            id="features-heading"
            className="text-center text-2xl font-bold tracking-tight text-fg-strong sm:text-3xl"
          >
            Everything your job search needs
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl bg-surface p-6 ring-1 ring-line"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
                  {feature.icon}
                </span>
                <h3 className="mt-4 font-semibold text-fg-strong">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Final call to action */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-3xl bg-surface px-6 py-14 text-center ring-1 ring-line">
            <h2 className="text-2xl font-bold tracking-tight text-fg-strong sm:text-3xl">
              Ready to organise your job search?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
              Create a free account and add your first application in under a
              minute.
            </p>
            <Link
              to="/login?mode=signup"
              className={`mt-8 px-6 py-3 ${primaryButton} focus-visible:ring-offset-surface`}
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-subtle sm:flex-row sm:px-6">
          <p>Built by Vasilis Apostolou</p>
          <a
            href="https://github.com/Vasilisap/job-tracker"
            target="_blank"
            rel="noreferrer"
            className={`rounded font-medium text-muted hover:text-fg-strong ${focusRing}`}
          >
            Source code on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
