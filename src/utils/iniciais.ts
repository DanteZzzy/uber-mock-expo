// "Mrs. Dennis Schulist" -> "DS" | "Leanne Graham" -> "LG"
const TRATAMENTOS = /^(mr|mrs|ms|miss|dr)\.?\s+/i;

export function iniciais(nome: string): string {
  const partes = nome.replace(TRATAMENTOS, "").trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) return "?";

  const primeira = partes[0][0];
  const segunda = partes.length > 1 ? partes[1][0] : "";

  return (primeira + segunda).toUpperCase();
}