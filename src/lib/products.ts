import { lumenImages } from "./lumen-images";

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
    id: "saracenum",
    slug: "saracenum",
    name: "Saracenum Uomo",
    tagline: "Nato tra le rocce e il mare, affinato negli abissi calabresi",
    description:
      "Un profumo maschile, legnoso-marino, affinato nelle profondità del Tirreno. Le note di bergamotto calabrese si fondono con legni arabi caldi e l'acqua di mare che rinfresca e potenzia le essenze botaniche.",
    price: 89,
    size: "100ml",
    image: lumenImages.saracenumMuretto,
    images: [
      lumenImages.saracenumMuretto,
      lumenImages.saracenumScoglioVerticale,
      lumenImages.saracenumScoglioAcqua,
      lumenImages.saracenumAcquaRiflesso,
      lumenImages.saracenumScoglio,
    ],
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
    image: lumenImages.thalasiMuretto,
    images: [
      lumenImages.thalasiMuretto,
      lumenImages.thalasiImmersa,
      lumenImages.profumiConMuretto,
      lumenImages.profumiMurettoPalazzo,
    ],
    gender: "donna",
    family: "fresco-marino",
    topNotes: ["Bergamotto", "Agrumi", "Fiori calabresi"],
    heartNotes: ["Sale marino", "Botaniche"],
    baseNotes: ["Legni morbidi", "Musk", "Ambra"],
    badge: "Primo al Mondo",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** I due profumi della collezione (esclusi set e campioni) */
export function getMainPerfumes(): Product[] {
  return products.filter(
    (p) => p.slug === "saracenum" || p.slug === "thalasi"
  );
}

export function getRelatedProduct(currentSlug: string): Product | undefined {
  if (currentSlug === "saracenum") return getProductBySlug("thalasi");
  if (currentSlug === "thalasi") return getProductBySlug("saracenum");
  return undefined;
}
