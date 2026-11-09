"use client";

import { LumenHero } from "./LumenHero";
import { LumenPoetrySection } from "./LumenPoetrySection";
import { LumenPerfumiSection } from "./LumenPerfumiSection";
import { LumenProgettoSection } from "./LumenProgettoSection";
import { LumenTerritorioSection } from "./LumenTerritorioSection";

export function MonopageHome() {
  return (
    <>
      <LumenHero />
      <LumenPoetrySection />
      <LumenPerfumiSection />
      <LumenProgettoSection />
      <LumenTerritorioSection />
    </>
  );
}
