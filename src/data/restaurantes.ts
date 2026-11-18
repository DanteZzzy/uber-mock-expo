import type {
  CategoriaIfood,
  CategoriaIfoodId,
  Restaurante,
} from "../types";

export const CHAVE_CARRINHO = "@ifood_carrinho";
export const CHAVE_PEDIDOS = "@ifood_pedidos";

export const CATEGORIAS_IFOOD: readonly CategoriaIfood[] = [
  { id: "restaurantes", label: "Restaurantes", icon: "restaurant-outline" },
  { id: "mercados", label: "Mercados", icon: "basket-outline" },
  { id: "farmacias", label: "Farmácias", icon: "medkit-outline" },
  { id: "bebida", label: "Bebida gelada", icon: "wine-outline", badge: "Novo" },
  { id: "pet", label: "Pet Shops", icon: "paw-outline" },
  { id: "promocoes", label: "Promoções", icon: "pricetag-outline", badge: "Novo" },
  { id: "shopping", label: "Shopping", icon: "bag-outline" },
  { id: "gourmet", label: "Gourmet", icon: "restaurant" },
  { id: "exclusivo", label: "Só no iFood", icon: "ribbon-outline", badge: "Novo" },
  { id: "todas", label: "Ver mais", icon: "grid-outline" },
];

export const RESTAURANTES: readonly Restaurante[] = [
  {
    id: "burger-house",
    nome: "Burger House",
    nota: 4.9,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKyuc7y5-W5VqqMFqmhX6OGV_IhO42ChS5pgLfHdKocg&s=10",
    tempoEntrega: "25-35 min",
    taxaEntrega: 5.9,
    cupom: true,
    categorias: ["restaurantes", "promocoes"],
    cardapio: [
      { id: "bh1", nome: "X-Burger Clássico", descricao: "Pão brioche, hambúrguer 180 g, queijo e salada", preco: 29.9 },
      { id: "bh2", nome: "Duplo Cheddar", descricao: "Dois hambúrgueres, cheddar cremoso e cebola caramelizada", preco: 38.9 },
      { id: "bh3", nome: "Batata Rústica", descricao: "Porção de 300 g com páprica", preco: 18.5 },
      { id: "bh4", nome: "Refrigerante Lata", descricao: "350 ml, vários sabores", preco: 6.5 },
    ],
  },
  {
    id: "cheddar-point",
    nome: "Cheddar Point",
    nota: 4.6,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8X-YthSZLUnyri0VToBl-OmCQVAwyUGiI0LMfHYF0Pw&s=10",
    tempoEntrega: "30-40 min",
    taxaEntrega: 6.5,
    cupom: true,
    categorias: ["restaurantes", "promocoes"],
    cardapio: [
      { id: "cp1", nome: "Cheddar Bacon", descricao: "Hambúrguer, cheddar e bacon crocante", preco: 34.9 },
      { id: "cp2", nome: "Nuggets com Cheddar", descricao: "10 unidades com molho cheddar", preco: 22.0 },
      { id: "cp3", nome: "Milk-shake de Chocolate", descricao: "400 ml", preco: 16.9 },
    ],
  },
  {
    id: "bacon-stack",
    nome: "Bacon Stack",
    nota: 4.2,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsf75uwt_YWOEkvmBeQI-dWu9GsrXEgeHhe94zx5EXg&s=10",
    tempoEntrega: "35-45 min",
    taxaEntrega: 4.9,
    cupom: true,
    categorias: ["restaurantes", "promocoes"],
    cardapio: [
      { id: "bs1", nome: "Stack Triplo", descricao: "Três camadas de carne e muito bacon", preco: 42.0 },
      { id: "bs2", nome: "Onion Rings", descricao: "Anéis de cebola empanados", preco: 19.9 },
      { id: "bs3", nome: "Suco de Laranja", descricao: "Natural, 500 ml", preco: 9.9 },
    ],
  },
  {
    id: "mercado-estrela",
    nome: "Mercado Estrela do Sul",
    nota: 4.7,
    imagem: "https://picsum.photos/seed/mercado-estrela/300/220",
    tempoEntrega: "40-55 min",
    taxaEntrega: 7.9,
    cupom: false,
    categorias: ["mercados", "shopping"],
    cardapio: [
      { id: "me1", nome: "Arroz Tipo 1 (5 kg)", descricao: "Grãos selecionados", preco: 28.9 },
      { id: "me2", nome: "Feijão Carioca (1 kg)", descricao: "Pacote de 1 kg", preco: 8.5 },
      { id: "me3", nome: "Leite Integral (1 L)", descricao: "Caixa de 1 litro", preco: 5.49 },
      { id: "me4", nome: "Café Torrado (500 g)", descricao: "Torra média", preco: 18.9 },
    ],
  },
  {
    id: "farmacia-vida",
    nome: "Farmácia Vida",
    nota: 4.8,
    imagem: "https://picsum.photos/seed/farmacia-vida/300/220",
    tempoEntrega: "20-30 min",
    taxaEntrega: 4.5,
    cupom: false,
    categorias: ["farmacias"],
    cardapio: [
      { id: "fv1", nome: "Protetor Solar FPS 50", descricao: "Frasco de 120 ml", preco: 39.9 },
      { id: "fv2", nome: "Álcool em Gel 70%", descricao: "Frasco de 500 ml", preco: 12.9 },
      { id: "fv3", nome: "Vitamina C Efervescente", descricao: "Tubo com 10 comprimidos", preco: 15.5 },
    ],
  },
  {
    id: "adega-gelada",
    nome: "Adega Gelada",
    nota: 4.5,
    imagem: "https://picsum.photos/seed/adega-gelada/300/220",
    tempoEntrega: "15-25 min",
    taxaEntrega: 5.0,
    cupom: true,
    categorias: ["bebida", "promocoes", "exclusivo"],
    cardapio: [
      { id: "ag1", nome: "Cerveja Pilsen (caixa com 12)", descricao: "Latas de 350 ml bem geladas", preco: 49.9 },
      { id: "ag2", nome: "Água com Gás (1,5 L)", descricao: "Garrafa gelada", preco: 4.9 },
      { id: "ag3", nome: "Energético 473 ml", descricao: "Lata gelada", preco: 9.5 },
    ],
  },
  {
    id: "pet-amigo",
    nome: "Pet Amigo",
    nota: 4.6,
    imagem: "https://picsum.photos/seed/pet-amigo/300/220",
    tempoEntrega: "30-45 min",
    taxaEntrega: 6.0,
    cupom: false,
    categorias: ["pet"],
    cardapio: [
      { id: "pa1", nome: "Ração para Cães (3 kg)", descricao: "Adultos, sabor carne", preco: 54.9 },
      { id: "pa2", nome: "Areia Higiênica (4 kg)", descricao: "Para gatos", preco: 21.9 },
      { id: "pa3", nome: "Petisco Dental", descricao: "Pacote com 7 unidades", preco: 14.9 },
    ],
  },
  {
    id: "trattoria-bella",
    nome: "Trattoria Bella",
    nota: 4.8,
    imagem: "https://picsum.photos/seed/trattoria-bella/300/220",
    tempoEntrega: "40-50 min",
    taxaEntrega: 8.9,
    cupom: false,
    categorias: ["restaurantes", "gourmet"],
    cardapio: [
      { id: "tb1", nome: "Fettuccine ao Funghi", descricao: "Massa fresca com molho de cogumelos", preco: 54.0 },
      { id: "tb2", nome: "Lasanha Bolonhesa", descricao: "Porção individual", preco: 46.0 },
      { id: "tb3", nome: "Tiramisù", descricao: "Sobremesa da casa", preco: 24.0 },
    ],
  },
  {
    id: "sushi-kaze",
    nome: "Sushi Kaze",
    nota: 4.9,
    imagem: "https://picsum.photos/seed/sushi-kaze/300/220",
    tempoEntrega: "35-50 min",
    taxaEntrega: 9.9,
    cupom: false,
    categorias: ["restaurantes", "gourmet", "exclusivo"],
    cardapio: [
      { id: "sk1", nome: "Combo 20 peças", descricao: "Sushis e sashimis variados", preco: 79.9 },
      { id: "sk2", nome: "Temaki de Salmão", descricao: "Com cream cheese", preco: 28.9 },
      { id: "sk3", nome: "Yakisoba", descricao: "Carne, frango e legumes", preco: 39.9 },
    ],
  },
  {
    id: "padaria-central",
    nome: "Padaria Central",
    nota: 4.4,
    imagem: "https://picsum.photos/seed/padaria-central/300/220",
    tempoEntrega: "20-30 min",
    taxaEntrega: 3.9,
    cupom: false,
    categorias: ["restaurantes", "exclusivo"],
    cardapio: [
      { id: "pc1", nome: "Pão Francês (10 un.)", descricao: "Saindo do forno", preco: 8.9 },
      { id: "pc2", nome: "Pão de Queijo (500 g)", descricao: "Congelado, pronto para assar", preco: 24.9 },
      { id: "pc3", nome: "Café com Leite", descricao: "300 ml", preco: 7.5 },
    ],
  },
];

export function buscarRestaurante(id: string): Restaurante | undefined {
  return RESTAURANTES.find((restaurante) => restaurante.id === id);
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filtrarRestaurantes(
  lista: readonly Restaurante[],
  categoria: CategoriaIfoodId | null,
  busca: string,
): Restaurante[] {
  const termo = normalizar(busca);

  return lista.filter((restaurante) => {
    const naCategoria =
      categoria === null ||
      categoria === "todas" ||
      restaurante.categorias.includes(categoria);
    if (!naCategoria) return false;
    if (termo === "") return true;

    return (
      normalizar(restaurante.nome).includes(termo) ||
      restaurante.cardapio.some((item) => normalizar(item.nome).includes(termo))
    );
  });
}
