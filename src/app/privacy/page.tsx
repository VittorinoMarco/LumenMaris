import { LumenDisplayTitle } from "@/components/lumen/LumenDisplayTitle";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy di Lumen Maris.",
};

export default function PrivacyPage() {
  return (
    <div data-theme="light" className="px-[var(--lm-section-px)] pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <LumenDisplayTitle as="h1" size="md" lines={[{ serif: "Privacy", script: "policy" }]} />
        <Reveal className="mt-16 space-y-6">
          <p className="lm-body md:text-[17px]">
            Lumen Maris rispetta la tua privacy. I dati personali che ci fornisci (nome, email, indirizzo) vengono utilizzati
            esclusivamente per evadere gli ordini e per inviarti comunicazioni relative ai nostri prodotti, previo tuo consenso.
          </p>
          <p className="lm-body md:text-[17px]">
            Non vendiamo né condividiamo i tuoi dati con terze parti. Puoi richiedere la cancellazione dei tuoi dati in
            qualsiasi momento contattandoci.
          </p>
          <p className="lm-body md:text-[17px]">Per ulteriori informazioni, contattaci alla pagina Contatti.</p>
        </Reveal>
      </div>
    </div>
  );
}
