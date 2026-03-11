export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  size: string;
  image: string;
  images?: string[];
  gender: "uomo" | "donna" | "unisex";
  family: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: "arcomagno",
    slug: "arcomagno",
    name: "Arcomagno Uomo",
    tagline: "Nato tra le rocce e il mare, affinato negli abissi calabresi",
    description:
      "Un profumo maschile, legnoso-marino, ispirato alle scogliere di Arcomagno. Le note di bergamotto calabrese si fondono con legni arabi caldi e l'acqua di mare che rinfresca e potenzia le essenze botaniche.",
    price: 89,
    size: "100ml",
    image: "/ProfumoUomo-Arcomagno.webp",
    gender: "uomo",
    family: "legnoso-marino",
    topNotes: ["Bergamotto", "Agrumi calabresi"],
    heartNotes: ["Botaniche marine", "Erbe aromatiche"],
    baseNotes: ["Legni arabi caldi", "Oud", "Ambra"],
    badge: "Primo al Mondo",
  },
  {
    id: "thalasi",
    slug: "thalasi",
    name: "Thalasi Donna",
    tagline: "L'onda che profuma, il sole che scalda",
    description:
      "Un profumo femminile, fresco-marino, che evoca le onde e i fiori d'arancio. Le note floreali calabresi si intrecciano con il sale marino e legni morbidi per una fragranza elegante e avvolgente.",
    price: 89,
    size: "100ml",
    image: "/ProfumoDonna-Thalasi.webp",
    gender: "donna",
    family: "fresco-marino",
    topNotes: ["Bergamotto", "Agrumi", "Fiori calabresi"],
    heartNotes: ["Sale marino", "Botaniche"],
    baseNotes: ["Legni morbidi", "Musk", "Ambra"],
    badge: "Primo al Mondo",
  },
  {
    id: "discovery-set",
    slug: "discovery-set",
    name: "Discovery Set",
    tagline: "Scopri entrambi i profumi",
    description:
      "Set di scoperta con campioni di Arcomagno e Thalasi. L'occasione perfetta per vivere l'esperienza Spirito Alchemico.",
    price: 35,
    size: "2x5ml",
    image: "/ProfumoUomo-Arcomagno.webp",
    gender: "unisex",
    family: "discovery",
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
    badge: "Edizione Limitata",
  },
  {
    id: "sample-kit",
    slug: "sample-kit",
    name: "Sample Kit",
    tagline: "Assaggia prima di scegliere",
    description:
      "Kit di campioni per provare le fragranze Spirito Alchemico prima dell'acquisto.",
    price: 15,
    size: "2x2ml",
    image: "/ProfumoDonna-Thalasi.webp",
    gender: "unisex",
    family: "sample",
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProduct(currentSlug: string): Product | undefined {
  if (currentSlug === "arcomagno") return getProductBySlug("thalasi");
  if (currentSlug === "thalasi") return getProductBySlug("arcomagno");
  return undefined;
}
