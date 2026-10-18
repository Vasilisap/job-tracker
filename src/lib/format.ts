const moneyFormat = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-IE", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormat = new Intl.DateTimeFormat("en-IE", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatSalary(
  min: number | null,
  max: number | null,
): string | null {
  if (min !== null && max !== null)
    return `${moneyFormat.format(min)} – ${moneyFormat.format(max)}`;
  if (min !== null) return `From ${moneyFormat.format(min)}`;
  if (max !== null) return `Up to ${moneyFormat.format(max)}`;

  return null;
}

export function formatDate(date: string | null): string | null {
  if (!date) return null;
  return dateFormat.format(new Date(date));
}

export function formatDateTime(date: string) {
  return dateTimeFormat.format(new Date(date));
}
