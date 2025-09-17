import { forwardRef, useEffect, useRef, useState } from "react";

/** cache decoded images so repeated visits don’t refetch/redecode */
const decodeCache = new Map();

function preloadAndDecode(src) {
  if (!src) return Promise.resolve();
  if (decodeCache.has(src)) return decodeCache.get(src);

  const p = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = src;

    const done = () => resolve();
    if (img.decode) {
      img.decode().then(done).catch(done);
    } else {
      img.onload = done;
      img.onerror = done;
    }
  });

  decodeCache.set(src, p);
  return p;
}

/**
 * SlideFadeImage
 * - Keeps two absolutely-positioned layers inside the SAME box.
 * - Preloads the new src, then crossfades: base -> overlay (same duration).
 * - No bleed or flicker even with different aspect ratios.
 *
 * Props:
 *   - src, alt
 *   - durationMs (default 500)
 *   - className, style (apply to wrapper)
 *   - isDragging, dragProgress (optional: just for visual feedback)
 *   - ...rest (mouse/touch handlers forwarded to both layers)
 */
const SlideFadeImage = forwardRef(
  (
    {
      src,
      alt,
      durationMs = 500,
      className = "",
      style,
      isDragging = false,
      dragProgress = 0,
      ...rest
    },
    ref
  ) => {
    const [baseSrc, setBaseSrc] = useState(src);        // visible image
    const [overlaySrc, setOverlaySrc] = useState(null); // incoming image
    const [fadeOn, setFadeOn] = useState(false);
    const lastApplied = useRef(src);
    const tRef = useRef(null);
    const cancelled = useRef(false);

    useEffect(() => {
      return () => {
        cancelled.current = true;
        if (tRef.current) clearTimeout(tRef.current);
      };
    }, []);

    useEffect(() => {
      if (!src || src === lastApplied.current) return;

      let localCancelled = false;

      const run = async () => {
        await preloadAndDecode(src);
        if (cancelled.current || localCancelled) return;

        // place incoming on top, then fade to it
        setOverlaySrc(src);
        requestAnimationFrame(() => {
          if (cancelled.current || localCancelled) return;
          setFadeOn(true);
          tRef.current = setTimeout(() => {
            if (cancelled.current || localCancelled) return;
            // promote
            setBaseSrc(src);
            setOverlaySrc(null);
            setFadeOn(false);
            lastApplied.current = src;
          }, durationMs);
        });
      };

      run();
      return () => {
        localCancelled = true;
      };
    }, [src, durationMs]);

    const layerCommon = {
      position: "absolute",
      inset: 0,
      margin: "auto",
      width: "auto",
      height: "auto",
      maxWidth: "100vw",
      maxHeight: "100dvh",
      objectFit: "contain",
      userSelect: "none",
      transform: isDragging
        ? `translateZ(0) scale(${1 - dragProgress * 0.05})`
        : "translateZ(0) scale(1)",
      willChange: "opacity, transform",
    };

    return (
      <div
        className={`relative h-full w-full flex items-center justify-center bg-black ${className}`}
        style={{ overflow: "hidden", ...style }}
      >
        {/* Base image (fades OUT) */}
        {baseSrc && (
          <img
            ref={ref}
            src={baseSrc}
            alt={alt}
            style={{
              ...layerCommon,
              opacity: fadeOn ? 0 : 1,
              transition: `opacity ${durationMs}ms ease`,
            }}
            draggable={false}
            {...rest}
          />
        )}

        {/* Overlay image (fades IN on top) */}
        {overlaySrc && (
          <img
            src={overlaySrc}
            alt=""
            aria-hidden="true"
            style={{
              ...layerCommon,
              opacity: fadeOn ? 1 : 0,
              transition: `opacity ${durationMs}ms ease`,
              zIndex: 1,
            }}
            draggable={false}
            {...rest}
          />
        )}
      </div>
    );
  }
);

export default SlideFadeImage;
