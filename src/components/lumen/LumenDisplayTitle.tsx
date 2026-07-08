import { cn } from "@/lib/utils";

interface LumenDisplayTitleProps {
  lines: { serif: string; script: string }[];
  onDark?: boolean;
  className?: string;
}

export function LumenDisplayTitle({
  lines,
  onDark = false,
  className,
}: LumenDisplayTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 md:gap-4",
        onDark && "lm-on-dark",
        className
      )}
    >
      {lines.map((line) => (
        <div key={`${line.serif}-${line.script}`} className="lm-display-line">
          <span className="lm-word-serif">{line.serif}</span>
          <span className="lm-word-script">{line.script}</span>
        </div>
      ))}
    </div>
  );
}
