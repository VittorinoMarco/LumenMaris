import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Chi Siamo",
  description:
    "La storia di Spirito Alchemico: portare la Calabria nel mondo attraverso profumi che raccontano territorio, mito e mare.",
};

export default function ChiSiamoPage() {
  return (
    <>
      <HeroSection
        title="Chi Siamo"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
        overlay
      />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="Team Spirito Alchemico"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
                  La Nostra Storia
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Spirito Alchemico nasce dalla passione per la Calabria e per
                  l&apos;arte della profumeria. Un team di visionari, artigiani e
                  amanti del territorio ha unito le forze per creare qualcosa di
                  mai visto prima: profumi affinati nelle profondità del mare
                  calabrese.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ogni flacone racconta una storia di innovazione, tradizione e
                  amore per il nostro territorio. Siamo orgogliosi di portare la
                  Calabria nel mondo attraverso fragranze che evocano il mare, il
                  bergamotto e il mito.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
              La Nostra Missione
            </h2>
            <p className="text-xl text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Portare la Calabria nel mondo attraverso profumi che raccontano
              territorio, mito e mare. Creare fragranze uniche che uniscono
              innovazione e tradizione, dove ogni goccia evoca il Tirreno, il
              bergamotto e le scogliere di Arcomagno.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
              I Nostri Valori
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-muted/10">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Artigianalità
                </h3>
                <p className="text-muted-foreground">
                  Ogni profumo è creato con cura artigianale, dalla miscelazione
                  all&apos;imbottigliamento. Nessun compromesso sulla qualità.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/10">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Innovazione
                </h3>
                <p className="text-muted-foreground">
                  L&apos;affinamento sottomarino è un processo unico al mondo. Siamo
                  pionieri nella profumeria di nicchia.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/10">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Sostenibilità Marina
                </h3>
                <p className="text-muted-foreground">
                  Rispettiamo il mare che ci ispira. Le nostre immersioni sono
                  non invasive e rispettose dell&apos;ecosistema marino.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
