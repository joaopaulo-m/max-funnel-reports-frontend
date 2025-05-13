export function getInitials(name: string): string {
  if (!name.trim()) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}
