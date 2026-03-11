import { HeroSection } from "@/components/HeroSection";
import { Timeline } from "@/components/Timeline";
import { ScrollReveal } from "@/components/ScrollReveal";

const timelineSteps = [
  {
    title: "Raccolta",
    description:
      "Bergamotto e agrumi da Reggio Calabria, erbe aromatiche locali e legni arabi selezionati vengono raccolti e preparati per la miscelazione.",
  },
  {
    title: "Miscelazione",
    description:
      "Le essenze botaniche vengono fuse secondo la nostra formula segreta, creando la base che verrà affinata nel mare.",
  },
  {
    title: "Immersione",
    description:
      "Le bottiglie vengono sigillate e immerse a 35 metri di profondità nelle acque di San Nicola Arcella, dove restano per sei mesi.",
  },
  {
    title: "Emersione",
    description:
      "Dopo l'affinamento sottomarino, le fragranze vengono recuperate e lasciate stabilizzare in superficie.",
  },
  {
    title: "Imbottigliamento",
    description:
      "Ogni flacone viene riempito e sigillato artigianalmente, pronto per raccontare la storia del mare calabrese.",
  },
];

export const metadata = {
  title: "Il Progetto",
  description:
    "Scopri il processo di affinamento sottomarino: come il mare a 35 metri di profondità trasforma le fragranze Spirito Alchemico.",
};

export default function ProgettoPage() {
  return (
    <>
      <HeroSection
        title="Il Progetto"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
        overlay
      />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              L&apos;Affinamento Sottomarino
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Per la prima volta al mondo, i profumi Spirito Alchemico vengono
              affinati nelle acque del Tirreno calabrese, a 35 metri di
              profondità, per sei mesi. La pressione marina — circa 4,5 bar —
              compatta le molecole delle essenze, mentre i minerali disciolti
              nell&apos;acqua di mare interagiscono con le note botaniche,
              arricchendole e rinfrescandole.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A quella profondità, la temperatura si mantiene costante tra 14 e
              18°C tutto l&apos;anno: un ambiente ideale per una maturazione lenta e
              uniforme. Il ciclo di sei mesi permette alle fragranze di
              sviluppare complessità e persistenza senza alterare le note
              originali.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              Le Botaniche Calabresi
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Il bergamotto di Reggio Calabria rappresenta oltre il 90% della
              produzione mondiale. Il suo profumo intenso, agrumato e leggermente
              floreale è il cuore di ogni nostra fragranza. Lo affiancano
              arance, limoni e cedri calabresi, oltre a erbe aromatiche locali
              che evocano la macchia mediterranea.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Queste note fresche e solari si intrecciano con legni arabi caldi —
              oud, sandalo, ambra — creando un dialogo tra Oriente e Mediterraneo
              che rende unici Arcomagno e Thalasi.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              L&apos;Acqua di Mare
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              L&apos;acqua di mare non è un semplice contenitore: è un ingrediente
              attivo. I sali minerali e gli oligoelementi disciolti nelle acque
              del Tirreno rinfrescano le note botaniche, esaltandone la
              luminosità senza appesantirle. Il risultato è una fragranza che
              evoca il mare calabrese — le onde, le scogliere, il sole — in ogni
              applicazione.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12 text-center">
              Il Viaggio della Produzione
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Timeline steps={timelineSteps} />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="font-serif text-2xl md:text-3xl italic text-center text-muted-foreground border-l-4 border-primary pl-8 py-4">
              &ldquo;Il mare non separa, unisce. E nelle sue profondità abbiamo
              trovato il segreto per portare la Calabria nel mondo.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
