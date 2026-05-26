import type { PatternId } from "@/lib/customization";
import { cn } from "@/lib/utils";

interface CardPatternProps {
  pattern: PatternId;
}

export function CardPattern({ pattern }: CardPatternProps) {
  if (pattern === "none") return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
      aria-hidden="true"
    >
      {pattern === "dots" && (
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
      {pattern === "grid" && (
        <div
          className={cn("h-full w-full")}
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      {pattern === "noise" && (
        <div
          className="h-full w-full opacity-30"
          style={{
            backgroundImage:
              "repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)",
            backgroundSize: "8px 8px",
          }}
        />
      )}
    </div>
  );
}
