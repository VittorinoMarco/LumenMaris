"use client";

import { useState } from "react";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { Input, fieldClass } from "@/components/ui/input";
import { LumenDisplayTitle } from "@/components/lumen/LumenDisplayTitle";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { ClipReveal } from "@/components/motion/ClipReveal";
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
    <div data-theme="mist" className="px-[var(--lm-section-px)] pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal as="p" className="lm-eyebrow mb-6">
            Parliamo
          </Reveal>
          <LumenDisplayTitle as="h1" size="lg" lines={[{ serif: "Scrivici", script: "ti rispondiamo" }]} />
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <Reveal>
            {submitted ? (
              <div className="py-10">
                <p className="lm-script t-accent text-[2.6rem] leading-none">Grazie</p>
                <p className="lm-body mt-4 max-w-md">
                  Grazie per averci contattato. Ti risponderemo al più presto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-9">
                <div>
                  <label htmlFor="name" className="lm-eyebrow">
                    Nome
                  </label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    required
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="lm-eyebrow">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    required
                    placeholder="la.tua@email.it"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="lm-eyebrow">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    required
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    placeholder="Raccontaci cosa cerchi…"
                  />
                </div>
                {submitError && <p className="text-sm text-[#b4533f]">{submitError}</p>}
                <button type="submit" className="lm-btn lm-btn-solid !px-10 !py-4" disabled={submitting}>
                  {submitting ? "Invio…" : "Invia messaggio"} <span className="lm-btn-arrow">→</span>
                </button>
              </form>
            )}
          </Reveal>

          <div>
            <ClipReveal>
              <ParallaxImage
                src={lumenImages.thalasiImmersa}
                alt="Thalasi immersa nel Tirreno"
                sizes="(max-width: 1024px) 80vw, 420px"
                speed={6}
                frameClassName="lm-arch mx-auto aspect-[3/4] max-w-sm shadow-[0_40px_80px_-38px_rgba(14,54,71,0.5)]"
              />
            </ClipReveal>
            <Reveal className="mx-auto mt-10 max-w-sm space-y-6" delay={0.1}>
              <div className="flex items-start gap-4">
                <MapPin className="t-accent mt-1 h-5 w-5 shrink-0" strokeWidth={1.3} />
                <div>
                  <p className="lm-italic text-[1.4rem] leading-tight">Lumen Maris</p>
                  <p className="lm-body">
                    San Nicola Arcella
                    <br />
                    Calabria, Italia
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-link lm-ui flex items-center gap-2 text-sm text-[var(--t-muted)] hover:text-[var(--t-fg)]"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.4} /> Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-link lm-ui flex items-center gap-2 text-sm text-[var(--t-muted)] hover:text-[var(--t-fg)]"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.4} /> Facebook
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
