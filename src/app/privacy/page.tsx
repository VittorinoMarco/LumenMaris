export const metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy di Spirito Alchemico.",
};

export default function PrivacyPage() {
  return (
    <div data-nav-surface="light" className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl font-semibold mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>
            Spirito Alchemico rispetta la tua privacy. I dati personali che ci
            fornisci (nome, email, indirizzo) vengono utilizzati esclusivamente
            per evadere gli ordini e per inviarti comunicazioni relative ai
            nostri prodotti, previo tuo consenso.
          </p>
          <p>
            Non vendiamo né condividiamo i tuoi dati con terze parti. Puoi
            richiedere la cancellazione dei tuoi dati in qualsiasi momento
            contattandoci.
          </p>
          <p>
            Per ulteriori informazioni, contattaci alla pagina Contatti.
          </p>
        </div>
      </div>
    </div>
  );
}
