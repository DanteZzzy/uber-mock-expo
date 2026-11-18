export function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export function formatarDataHora(data: Date): string {
  const mes = data.toLocaleString("pt-BR", { month: "short" });
  const hora = data.getHours().toString().padStart(2, "0");
  const minuto = data.getMinutes().toString().padStart(2, "0");
  return `${data.getDate()} de ${mes} • ${hora}:${minuto}`;
}
