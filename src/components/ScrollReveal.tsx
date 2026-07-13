"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom" | "none";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "bottom",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -80px 0px", // Trigger when it is 80px above the viewport fold
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getDirectionStyles = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }

    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-16 scale-95 pointer-events-none";
      case "right":
        return "opacity-0 translate-x-16 scale-95 pointer-events-none";
      case "bottom":
        return "opacity-0 translate-y-16 scale-95 pointer-events-none";
      case "none":
      default:
        return "opacity-0 scale-95 pointer-events-none";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${getDirectionStyles()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
