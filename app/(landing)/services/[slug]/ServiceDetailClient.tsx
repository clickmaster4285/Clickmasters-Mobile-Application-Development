// app/services/[slug]/client.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArticleRenderer } from "@/components/services/ArticleRenderer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ServiceDetailClientProps {
  content: {
    content: string;
    metadata: {
      title_tag: string;
      meta_description: string;
    };
    slug: string;
  };
}

export function ServiceDetailClient({ content }: ServiceDetailClientProps) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger needs to be refreshed after mounting
    ScrollTrigger.refresh();
  }, []);

  useGSAP(
    () => {
      // Hero animations - select elements by class
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Article content animations
      gsap.utils.toArray<HTMLElement>(".article-prose > *").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="mt-12">
      <div className="hero-reveal">
        <ArticleRenderer markdown={content.content} />
      </div>
    </div>
  );
}
