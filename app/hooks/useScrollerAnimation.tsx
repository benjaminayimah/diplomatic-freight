'use client'
import { useEffect } from 'react';

export function useScrollerAnimation() {
  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller');

    const addAnimation = () => {
      scrollers.forEach(scroller => {
        if (scroller.getAttribute('data-animated') === 'true') return;

        scroller.setAttribute('data-animated', 'true');

        const scrollerInner = scroller.querySelector('.scroller-inner');
        if (!scrollerInner) return;

        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute('aria-hidden', 'true');
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }
  }, []);
}
