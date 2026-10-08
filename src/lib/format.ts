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
