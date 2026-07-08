"use client";

import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { lumenImages } from "@/lib/lumen-images";

export default function ContattiPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error ?? "Invio non riuscito");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Errore di connessione");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection
        title="Contatti"
        image={lumenImages.saracenumScoglioAcqua}
        overlay
      />

      <section data-nav-surface="light" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-6">
                Scrivici
              </h2>
              {submitted ? (
                <p className="text-muted-foreground">
                  Grazie per averci contattato. Ti risponderemo al più presto.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      required
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      required
                      placeholder="la.tua@email.it"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      required
                      rows={5}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Il tuo messaggio..."
                    />
                  </div>
                  {submitError && (
                    <p className="text-sm text-red-600">{submitError}</p>
                  )}
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? "Invio..." : "Invia Messaggio"}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold mb-6">
                Dove Siamo
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Spirito Alchemico</p>
                    <p className="text-muted-foreground">
                      San Nicola Arcella
                      <br />
                      Calabria, Italia
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
