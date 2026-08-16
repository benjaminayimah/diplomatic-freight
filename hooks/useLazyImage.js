import { useEffect, useRef, useState } from "react";

export default function useLazyImage(fullSrc) {
  const ref = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || !fullSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const image = new Image();

        image.src = fullSrc;

        image.onload = () => {
          setLoadedSrc(fullSrc);
        };

        observer.unobserve(element);
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fullSrc]);

  return {
    ref,
    src: loadedSrc,
    loaded: !!loadedSrc,
  };
}