import { useEffect, useRef } from "react";

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel: string;
  pendingLabel: string;
  isPending: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  pendingLabel,
  isPending,
  error,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      className="m-auto w-full max-w-md rounded-2xl bg-surface p-6 text-fg shadow-xl ring-1 ring-line backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
    >
      <h2
        id="confirm-dialog-title"
        className="text-lg font-semibold text-fg-strong"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted">{message}</p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 dark:bg-red-950/60 px-3 py-2 text-sm text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-900"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          autoFocus
          className="cursor-pointer rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-fg hover:bg-raised focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? pendingLabel : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
