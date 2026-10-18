import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/utils/cn";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export interface PropertyGalleryProps {
  images: string[];
  title: string;
}

/**
 * Galerie premium : image principale + miniatures cliquables, transition
 * douce entre images (Framer Motion), et un lightbox léger (pas de
 * librairie) qui verrouille le scroll, se ferme avec Escape, et est
 * navigable au clavier (flèches gauche/droite).
 */
export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const count = images.length;

  const goTo = useCallback((index: number) => setActiveIndex(((index % count) + count) % count), [count]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Verrouille le scroll de la page et gère Escape / flèches pendant que le
  // lightbox est ouvert — empêche toute interaction avec le contenu derrière.
  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, goPrev, goNext]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-card bg-onyx-100">
        <AnimatePresence mode="wait">
          <motion.button
            key={activeIndex}
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Agrandir l'image ${activeIndex + 1} sur ${count}`}
          >
            <ImageWithFallback
              src={images[activeIndex]}
              alt={`${title} — photo ${activeIndex + 1} sur ${count}`}
              className="h-full w-full object-cover"
            />
          </motion.button>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory-50/90 p-2 text-onyx-900 shadow-card transition hover:bg-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory-50/90 p-2 text-onyx-900 shadow-card transition hover:bg-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-onyx-950/70 px-3 py-1 text-small !text-ivory-50">
              {activeIndex + 1} / {count}
            </span>
          </>
        )}

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-onyx-950/70 px-3 py-1 text-small !text-ivory-50 sm:hidden">
          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
          Agrandir
        </span>
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Voir la photo ${index + 1} sur ${count}`}
              aria-current={index === activeIndex}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-28",
                index === activeIndex ? "border-gold-500" : "border-transparent hover:border-onyx-200"
              )}
            >
              <ImageWithFallback src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-onyx-950/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie photo — ${title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Fermer la galerie"
              className="absolute right-4 top-4 rounded-full bg-ivory-50/10 p-2 text-ivory-50 transition hover:bg-ivory-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Image précédente"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-ivory-50/10 p-2 text-ivory-50 transition hover:bg-ivory-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                  aria-label="Image suivante"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-ivory-50/10 p-2 text-ivory-50 transition hover:bg-ivory-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${title} — photo ${activeIndex + 1} sur ${count}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ivory-50/10 px-3 py-1 text-small !text-ivory-200">
              {activeIndex + 1} / {count}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
