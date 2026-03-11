"use client";

import { motion } from "framer-motion";

interface OlfactoryPyramidProps {
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

export function OlfactoryPyramid({
  topNotes,
  heartNotes,
  baseNotes,
}: OlfactoryPyramidProps) {
  const levels = [
    { title: "Note di testa", notes: topNotes, delay: 0 },
    { title: "Note di cuore", notes: heartNotes, delay: 0.1 },
    { title: "Note di base", notes: baseNotes, delay: 0.2 },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-serif text-lg font-semibold">Piramide olfattiva</h4>
      <div className="space-y-6">
        {levels.map((level) => (
          <motion.div
            key={level.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: level.delay }}
          >
            <h5 className="text-sm font-medium text-muted-foreground mb-2">
              {level.title}
            </h5>
            <div className="flex flex-wrap gap-2">
              {level.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
