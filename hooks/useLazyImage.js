import { useEffect, useRef, useState } from "react";

export default function useLazyImage() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
          setLoaded(true);
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

  return { ref, src, loaded };
}