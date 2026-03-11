import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { ImageGallery } from "@/components/ImageGallery";
import { CounterAnimation } from "@/components/CounterAnimation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/products";

const territorioImages = [
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    alt: "Costa calabrese",
    label: "Costa calabrese",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    alt: "Bergamotto",
    label: "Bergamotto di Reggio Calabria",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80",
    alt: "Arco di roccia",
    label: "Arcomagno",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    alt: "Tramonto sul mare",
    label: "Tramonto calabrese",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    alt: "Onde",
    label: "Il mare Tirreno",
  },
];

export default function HomePage() {
  const arcomagno = getProductBySlug("arcomagno");
  const thalasi = getProductBySlug("thalasi");

  return (
    <>
      <HeroSection
        title="Il primo affinamento di profumi a 35 metri di profondità"
        subtitle="Nato dal mare calabrese."
        ctaLabel="Scopri i Profumi"
        ctaHref="/shop"
        video="/hero-video.mp4"
      />

      <section className="py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                  alt="Affinamento sottomarino"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                  L&apos;Essenza del Progetto
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Spirito Alchemico nasce da un&apos;intuizione rivoluzionaria: immergere
                  le fragranze nelle acque del Tirreno calabrese, a 35 metri di
                  profondità, per sei mesi. La pressione marina, i minerali
                  dell&apos;oceano e la temperatura costante degli abissi
                  trasformano le essenze botaniche in qualcosa di unico.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Bergamotto di Reggio Calabria, agrumi locali, erbe aromatiche e
                  legni arabi caldi si fondono con l&apos;acqua di mare che rinfresca
                  e potenzia ogni nota. Un processo mai realizzato prima al mondo.
                </p>
                <Button asChild variant="outline" className="mt-8">
                  <Link href="/progetto">Scopri il Progetto</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-16">
              I Due Profumi
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {arcomagno && (
              <ScrollReveal delay={0.1}>
                <ProductCard product={arcomagno} />
              </ScrollReveal>
            )}
            {thalasi && (
              <ScrollReveal delay={0.2}>
                <ProductCard product={thalasi} />
              </ScrollReveal>
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/shop">Vedi Tutti i Profumi</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
              Il Territorio
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ImageGallery images={territorioImages} className="max-w-5xl mx-auto" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              Dalle coltivazioni di bergamotto alla costa di San Nicola Arcella,
              dall&apos;arco naturale di Arcomagno alle onde del Tirreno: la Calabria
              è l&apos;anima di ogni nostra fragranza.
            </p>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/territorio">Esplora il Territorio</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-4 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4">
              Prima Volta al Mondo
            </h2>
            <p className="text-center text-primary-foreground/90 mb-16">
              Un processo unico. Numeri che raccontano l&apos;innovazione.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <CounterAnimation
              items={[
                { value: 35, suffix: "m", label: "Profondità" },
                { value: 6, suffix: " mesi", label: "Affinamento" },
                { value: 2, label: "Profumi" },
                { value: 1, label: "Processo" },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
