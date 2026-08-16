import { useEffect, useRef, useState } from "react";

export function useLazyImage() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const fullSrc = element.dataset.src;

    if (!fullSrc) return;

    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;

        const image = new Image();

        image.src = fullSrc;

        image.onload = () => {
          setSrc(fullSrc);
        };

        observer.unobserve(element);
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, src];
}