/** Asset editoriali Lumen Maris — path sotto /public */
export const lumenImages = {
  saracenumMuretto: "/images/Saracenum-conMuretto.png",
  thalasiMuretto: "/images/Thalasi-conMuretto.png",
  saracenumScoglio: "/images/Saracenum-Scoglio.jpg",
  saracenumScoglioVerticale: "/images/Saracenum-ScoglioVerticale.jpg",
  saracenumScoglioAcqua: "/images/Saracenum-ScoglioAcqua.jpg",
  saracenumAcquaRiflesso: "/images/Saracenum-AcquaRiflesso.png",
  thalasiImmersa: "/images/Thalasi-Immersa.png",
  profumiMurettoPalazzo: "/images/Profumi-MurettoPalazzo.png",
  profumiConMuretto: "/images/Profumi-conMuretto.jpg",
  /** Packshot legacy — dettaglio flacone */
  saracenumPackshot: "/ProfumoUomo-Saracenum.webp",
} as const;

export type LumenImageKey = keyof typeof lumenImages;
