export function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export function formatarDataHora(data: Date): string {
  const mes = data.toLocaleString("pt-BR", { month: "short" });
  const hora = data.getHours().toString().padStart(2, "0");
  const minuto = data.getMinutes().toString().padStart(2, "0");
  return `${data.getDate()} de ${mes} • ${hora}:${minuto}`;
}

export function apenasDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

export function formatarTelefone(texto: string): string {
  const digitos = apenasDigitos(texto).slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}
