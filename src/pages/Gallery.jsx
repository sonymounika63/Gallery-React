import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

// Local images (adjust paths if needed)
import aboutThumbImage from "@/assets/images/about-thumb.png";
import processThumbImage from "@/assets/images/process-thumb.jpg";
import project2Image from "@/assets/images/project-2.jpg";
import skillThumbImage from "@/assets/images/skill-thumb.png";

const IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    alt: "Mobile app UI mockups",
    tags: ["mobile", "ui"],
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    alt: "Web dashboard analytics",
    tags: ["web", "dashboard"],
  },
  {
    id: 3,
    src: aboutThumbImage,
    alt: "About thumbnail image",
    tags: ["about", "thumbnail"],
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    alt: "Team collaboration",
    tags: ["team", "collab"],
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    alt: "Developer workspace",
    tags: ["workspace"],
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    alt: "Product planning",
    tags: ["planning"],
  },
  {
    id: 7,
    src: processThumbImage,
    alt: "Process workflow",
    tags: ["process", "workflow"],
  },
  {
    id: 8,
    src: project2Image,
    alt: "Project showcase",
    tags: ["project", "showcase"],
  },
  {
    id: 9,
    src: skillThumbImage,
    alt: "Skills and expertise",
    tags: ["skills", "expertise"],
  },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragProgress, setDragProgress] = useState(0);
  const imageRef = useRef(null);

  const openAt = useCallback((idx) => {
    setActiveIndex(idx);
    setOpen(true);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const current = useMemo(() => IMAGES[activeIndex], [activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  // Drag/swipe handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);
  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const threshold = 50;
      const progress = Math.min(Math.abs(deltaX) / threshold, 1);
      setDragProgress(progress);
      if (Math.abs(deltaX) > threshold) {
        deltaX > 0 ? prev() : next();
        setIsDragging(false);
        setDragProgress(0);
      }
    },
    [isDragging, dragStart, next, prev]
  );
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragProgress(0);
  }, []);
  const handleTouchStart = useCallback((e) => {
    const t = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: t.clientX, y: t.clientY });
  }, []);
  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      const t = e.touches[0];
      const deltaX = t.clientX - dragStart.x;
      const threshold = 50;
      const progress = Math.min(Math.abs(deltaX) / threshold, 1);
      setDragProgress(progress);
      if (Math.abs(deltaX) > threshold) {
        deltaX > 0 ? prev() : next();
        setIsDragging(false);
        setDragProgress(0);
      }
    },
    [isDragging, dragStart, next, prev]
  );
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setDragProgress(0);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
        <p className="text-sm text-muted-foreground">
          A minimal, responsive gallery using shadcn/ui in React (JSX).
        </p>
      </header>

      <Separator className="mb-6" />

      {/* Grid — equal gutters, landscape thumbs */}
      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] gap-5">
        {IMAGES.map((img, idx) => (
          <Card
            key={img.id}
            className="group overflow-hidden hover:shadow-lg transition-shadow h-full"
          >
            <CardContent className="p-0">
              <button
                onClick={() => openAt(idx)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label={`Open ${img.alt} in lightbox`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>

              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm line-clamp-1">{img.alt}</p>
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {img.tags?.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox — full screen, fixed nav buttons */}
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="
      !fixed !left-0 !top-0 !translate-x-0 !translate-y-0
      !w-screen !h-[100dvh] !max-w-none !m-0 !rounded-none !p-0
      z-50
    "
  >
    <div className="relative h-full w-full bg-black select-none">
      {/* Close (fixed) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="fixed top-3 right-3 z-[61] bg-black/50 hover:bg-black/70 text-white"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* FIXED Prev/Next overlay (stays put) */}
      <div className="pointer-events-none fixed inset-0 z-[60]">
        {/* Prev */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            aria-label="Previous"
            className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>
        </div>
        {/* Next */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            aria-label="Next"
            className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronRight className="h-7 w-7" />
          </Button>
        </div>
      </div>

      {/* Image area — full screen, no cropping */}
      <div
        className="h-full w-full flex items-center justify-center overflow-hidden"
        onTouchMoveCapture={(e) => {
          if (e.cancelable) e.preventDefault();
        }}
      >
        <img
          ref={imageRef}
          src={current?.src}
          alt={current?.alt}
          className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-150 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            opacity: isDragging ? 1 - dragProgress * 0.3 : 1,
            transform: isDragging
              ? `scale(${1 - dragProgress * 0.05})`
              : "scale(1)",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          draggable={false}
        />
      </div>

      {/* Pagination (overlay, centered, fixed) */}
      <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[60] flex justify-center">
        <div className="pointer-events-auto text-sm font-bold text-white bg-orange-500/90 px-4 py-2 rounded-full shadow-lg">
          {activeIndex + 1} of {IMAGES.length}
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>

    </div>
  );
}
