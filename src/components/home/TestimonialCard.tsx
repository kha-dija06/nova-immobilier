import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { getInitials } from "@/utils/formatters";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { author, role, content, rating } = testimonial;

  return (
    <figure className="flex h-full flex-col gap-6 rounded-card border border-onyx-900/5 bg-white p-8 shadow-card">
      <div className="flex items-center gap-0.5" role="img" aria-label={`Note : ${rating} sur 5 étoiles`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={index < rating ? "h-4 w-4 fill-gold-500 text-gold-500" : "h-4 w-4 text-onyx-200"}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="flex-1 text-body">&ldquo;{content}&rdquo;</blockquote>

      <figcaption className="flex items-center gap-3 border-t border-onyx-900/5 pt-6">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-onyx-800 font-display text-sm font-semibold text-ivory-50"
          aria-hidden="true"
        >
          {getInitials(author)}
        </div>
        <div>
          <p className="text-sm font-semibold text-onyx-900">{author}</p>
          {role && <p className="text-small">{role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
