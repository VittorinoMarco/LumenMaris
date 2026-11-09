/**
 * Asset editoriali Lumen Maris.
 * Le versioni in /images/web sono ottimizzate (max 2200px, JPEG ~80): gli originali
 * da decine di MB restano in /images e NON vanno usati nelle pagine.
 */
export const lumenImages = {
  saracenumMuretto: "/images/web/Saracenum-conMuretto.jpg",
  thalasiMuretto: "/images/web/Thalasi-conMuretto.jpg",
  saracenumScoglio: "/images/web/Saracenum-Scoglio.jpg",
  saracenumScoglioVerticale: "/images/web/Saracenum-ScoglioVerticale.jpg",
  saracenumScoglioAcqua: "/images/web/Saracenum-ScoglioAcqua.jpg",
  saracenumAcquaRiflesso: "/images/web/Saracenum-AcquaRiflesso.jpg",
  thalasiImmersa: "/images/web/Thalasi-Immersa.jpg",
  profumiMurettoPalazzo: "/images/web/Profumi-MurettoPalazzo.jpg",
  profumiConMuretto: "/images/web/Profumi-conMuretto.jpg",
  /** Packshot legacy — dettaglio flacone */
  saracenumPackshot: "/ProfumoUomo-Saracenum.webp",
} as const;

export type LumenImageKey = keyof typeof lumenImages;
