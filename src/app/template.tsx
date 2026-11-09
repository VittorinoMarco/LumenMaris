"use client";

import { motion } from "framer-motion";

/** Ingresso morbido tra una pagina e l'altra (solo opacità: niente transform che rompa sticky/pin). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
