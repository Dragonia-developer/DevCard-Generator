"use client";

import { useEffect, useRef, useState } from "react";
import { DevCard } from "@/components/DevCard";
import type { CardCustomization } from "@/lib/customization";
import type { CardSize, CardTheme } from "@/lib/themes";
import type { DevCardData } from "@/types/github";

interface CardPreviewProps {
  data: DevCardData;
  theme: CardTheme;
  size: CardSize;
  customization: CardCustomization;
  cardRef: React.RefObject<HTMLDivElement | null>;
  isDemo?: boolean;
}

export function CardPreview({
  data,
  theme,
  size,
  customization,
  cardRef,
  isDemo = false,
}: CardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const padding = 32;
      const availableWidth = container.clientWidth - padding;
      const availableHeight = window.innerHeight * 0.55;
      const scaleX = availableWidth / size.width;
      const scaleY = availableHeight / size.height;
      setScale(Math.min(1, scaleX, scaleY));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [size.width, size.height]);

  return (
    <div
      ref={containerRef}
      className="flex w-full items-center justify-center overflow-hidden py-2"
    >
      <div
        style={{
          width: size.width * scale,
          height: size.height * scale,
        }}
        className="relative shrink-0"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: size.width,
            height: size.height,
          }}
        >
          <DevCard
            ref={cardRef}
            data={data}
            theme={theme}
            size={size}
            customization={customization}
            isDemo={isDemo}
          />
        </div>
      </div>
    </div>
  );
}
