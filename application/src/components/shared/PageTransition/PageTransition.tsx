'use client';

// Libraries
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={{
          hidden: { opacity: 0, x: -200, y: -100 },
          enter: { opacity: 1, x: 0, y: 0 },
          // exit: { opacity: 0, x: 0, y: -100 },
        }}
        transition={{
          type: 'linear',
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
