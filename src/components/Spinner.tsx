type SpinnerProps = {
  /** Width and height in pixels. */
  size?: number;
  /** Announced to screen readers. */
  label?: string;
};

const LINE_COUNT = 12;

/**
 * "Rotating lines" spinner: twelve lines with rising opacity, turned one
 * line-step at a time so the bright head appears to chase around the ring.
 */
export default function Spinner({ size = 32, label = "Loading" }: SpinnerProps) {
  return (
    <div role="status" className="inline-flex">
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden="true"
        className="animate-spin-steps text-cyan-500"
      >
        {Array.from({ length: LINE_COUNT }, (_, i) => (
          <line
            key={i}
            x1="12"
            y1="2"
            x2="12"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={(i + 1) / LINE_COUNT}
            transform={`rotate(${(i * 360) / LINE_COUNT} 12 12)`}
          />
        ))}
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Centres a spinner on the whole screen, for route-level loading. */
export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner size={40} />
    </div>
  );
}
