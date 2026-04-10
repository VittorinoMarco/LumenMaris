import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { EditorialProductShowcase } from "@/components/EditorialProductShowcase";
import { ImageGallery } from "@/components/ImageGallery";
import { CounterAnimation } from "@/components/CounterAnimation";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { ParallaxBackdrop } from "@/components/ParallaxBackdrop";
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
        ctaLabel="Scopri i profumi"
        ctaHref="/shop"
        video="/hero-video.mp4"
        backdropWord="mare"
      />

      <section className="section-x section-y relative overflow-hidden bg-background">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-6">
            <GsapScrollReveal className="lg:col-span-6" y={40}>
              <div className="relative">
                <div className="absolute -right-8 top-1/4 hidden h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl lg:block" />
                <div className="relative aspect-[4/5] max-h-[min(78vh,560px)] w-full shadow-[0_32px_80px_-28px_rgba(30,40,35,0.45)]">
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                    alt="Affinamento sottomarino"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal className="lg:col-span-5 lg:col-start-8" delay={0.12} y={36}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-primary/90">
                Una nuova filosofia
              </p>
              <h2 className="mt-6 font-display text-display-sm font-light tracking-[-0.02em] text-foreground">
                L&apos;essenza del progetto
              </h2>
              <div className="mt-10 space-y-8">
                <p className="editorial-body max-w-md">
                  Spirito Alchemico nasce da un&apos;intuizione rivoluzionaria:
                  immergere le fragranze nelle acque del Tirreno calabrese, a 35
                  metri di profondità, per sei mesi. La pressione marina, i
                  minerali dell&apos;oceano e la temperatura costante degli
                  abissi trasformano le essenze botaniche in qualcosa di unico.
                </p>
                <p className="editorial-body max-w-md">
                  Bergamotto di Reggio Calabria, agrumi locali, erbe aromatiche e
                  legni arabi caldi si fondono con l&apos;acqua di mare che
                  rinfresca e potenzia ogni nota. Un processo mai realizzato
                  prima al mondo.
                </p>
              </div>
              <div className="mt-14">
                <Button asChild variant="pillOutline">
                  <Link href="/progetto">Il progetto</Link>
                </Button>
              </div>
            </GsapScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-x relative overflow-hidden bg-cream/80 py-28 md:py-36">
        <ParallaxBackdrop text="due" />
        <div className="relative z-[1] mx-auto max-w-[1100px]">
          <GsapScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-primary/90">
                Collezione
              </p>
              <h2 className="mt-5 font-display text-display-sm font-light tracking-[-0.02em] text-foreground">
                I due profumi
              </h2>
              <p className="editorial-body mx-auto mt-8 max-w-lg">
                Due narrazioni olfattive, un unico rito sottomarino. Forme
                libere, senza cornici: la fragranza incontra il territorio.
              </p>
            </div>
          </GsapScrollReveal>

          <div className="mt-20 space-y-28 md:mt-28 md:space-y-36">
            {arcomagno && (
              <EditorialProductShowcase product={arcomagno} reversed={false} />
            )}
            {thalasi && (
              <EditorialProductShowcase product={thalasi} reversed />
            )}
          </div>

          <GsapScrollReveal className="mt-20 flex justify-center md:mt-24">
            <Button asChild variant="pill">
              <Link href="/shop">Vedi tutti i profumi</Link>
            </Button>
          </GsapScrollReveal>
        </div>
      </section>

      <section className="section-x section-y bg-background">
        <div className="mx-auto max-w-6xl">
          <GsapScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-primary/90">
                Origini
              </p>
              <h2 className="mt-5 font-display text-display-sm font-light tracking-[-0.02em] text-foreground">
                Il territorio
              </h2>
            </div>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.08} className="mt-14 md:mt-20">
            <ImageGallery images={territorioImages} />
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.12} className="mt-14 md:mt-16">
            <p className="editorial-body mx-auto max-w-2xl text-center">
              Dalle coltivazioni di bergamotto alla costa di San Nicola Arcella,
              dall&apos;arco naturale di Arcomagno alle onde del Tirreno: la
              Calabria è l&apos;anima di ogni nostra fragranza.
            </p>
            <div className="mt-12 flex justify-center">
              <Button asChild variant="pillOutline">
                <Link href="/territorio">Esplora il territorio</Link>
              </Button>
            </div>
          </GsapScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-deep/70 py-28 md:py-36">
        <ParallaxBackdrop text="primo" scrub={0.45} />
        <div className="section-x relative z-[1] mx-auto max-w-5xl">
          <GsapScrollReveal>
            <div className="text-center">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-primary/90">
                Innovazione
              </p>
              <h2 className="mt-5 font-display text-display-sm font-light tracking-[-0.02em] text-foreground">
                Prima volta al mondo
              </h2>
              <p className="editorial-body mx-auto mt-8 max-w-lg">
                Un processo unico. Numeri che raccontano l&apos;innovazione.
              </p>
            </div>
          </GsapScrollReveal>
          <div className="mt-16 md:mt-20">
            <CounterAnimation
              items={[
                { value: 35, suffix: "m", label: "Profondità" },
                { value: 6, suffix: " mesi", label: "Affinamento" },
                { value: 2, label: "Profumi" },
                { value: 1, label: "Processo" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
