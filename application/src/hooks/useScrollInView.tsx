'use client';

// Libraries
import { useEffect, useRef, useState } from 'react';
import { AnimationProps, useInView } from 'framer-motion';

interface UseScrollInViewOptions {
  threshold?: number;
  once?: boolean;
  initial?: AnimationProps['initial'];
  animate?: AnimationProps['animate'];
  transition?: AnimationProps['transition'];
}

export const useScrollInView = (options: UseScrollInViewOptions = {}) => {
  const {
    threshold = 0.1,
    once = true,
    initial = { opacity: 0, y: 50 },
    animate = { opacity: 1, y: 0 },
    transition = { duration: 0.5, ease: 'easeOut' },
  } = options || {};

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const animationProps: AnimationProps = {
    initial,
    animate: hasAnimated || isInView ? animate : initial,
    transition,
  };

  return { ref, animationProps, isInView };
};
