import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ScrollReveal } from "@/components/ScrollReveal";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    alt: "Costa calabrese",
    label: "Costa Tirrenica",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    alt: "Bergamotto",
    label: "Bergamotto di Reggio",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    alt: "Arco di roccia",
    label: "Arcomagno",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    alt: "Mare",
    label: "San Nicola Arcella",
  },
];

export const metadata = {
  title: "Il Territorio",
  description:
    "La Calabria, il mare Tirreno, il bergamotto di Reggio e il mito di Enea: il territorio che ispira Spirito Alchemico.",
};

export default function TerritorioPage() {
  return (
    <>
      <HeroSection
        title="Il Territorio"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
        overlay
      />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              La Calabria e il Mare
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              La Calabria vive in simbiosi con il mare Tirreno. A San Nicola
              Arcella, piccolo borgo della costa cosentina, si trova
              l&apos;Arcomagno: un arco naturale di roccia che si tuffa nelle acque
              cristalline. È qui che Spirito Alchemico affina i suoi profumi,
              in un luogo dove terra e mare si abbracciano da millenni.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Le scogliere, le grotte marine, le onde che lambiscono la costa:
              ogni elemento di questo territorio entra nelle nostre fragranze,
              raccontando una storia di luce, sale e profumo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
                  alt="Bergamotto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
                  Il Bergamotto
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Il bergamotto di Reggio Calabria è un&apos;eccellenza mondiale. La
                  fascia costiera tra Villa San Giovanni e Gioiosa Ionica produce
                  oltre il 90% del bergamotto globale. Il suo colore dorato, il
                  profumo intenso e agrumato, le proprietà uniche: tutto concorre
                  a fare di questo frutto il cuore delle nostre fragranze.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le note di bergamotto portano luce e freschezza, si intrecciano
                  con i fiori d&apos;arancio e il sale marino, creando un profilo
                  olfattivo inconfondibile che evoca il sole calabrese.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              Magna Grecia e il Mito di Enea
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              La Calabria è terra di Magna Grecia. A Capo Colonna, nei pressi di
              Crotone, sorgeva il tempio di Hera Lacinia, uno dei santuari più
              importanti del mondo antico. Enea, secondo Virgilio, navigò lungo
              queste coste nel suo viaggio verso Roma, toccando le spiagge
              calabresi dove mito e storia si fondono.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Spirito Alchemico si ispira a questa eredità: profumi che
              raccontano il viaggio, il mare come via di scoperta, la Calabria
              come crocevia di culture e profumi. Ogni goccia evoca il mito, il
              territorio e l&apos;innovazione.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
              Galleria del Territorio
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={img.alt} delay={i * 0.1}>
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-2 px-3 text-sm">
                    {img.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
