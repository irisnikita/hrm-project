import { useState, useEffect, RefObject } from 'react';

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
}

export const useScrollPosition = (
  threshold: number = 0,
  elementRef?: RefObject<HTMLElement>,
): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const element = elementRef?.current;
    const handleScroll = () => {
      const currentScrollY = element ? element.scrollTop : window.scrollY;
      setScrollPosition({
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
      });
    };

    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Call handler right away so state gets updated with initial window position
    handleScroll();

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [threshold, elementRef]);

  return scrollPosition;
};
