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

      <h2 className="font-black">Dropshipping</h2>
      <p>
        Aiprintfinity dropshipping service is a one-stop solution for all your customization needs,
        enabling you to design and seamlessly push your products to third-party stores without the
        need to order any inventory. This expands your reach and convenience with no upfront
        investments. With our dropshipping service, every item is printed on demand and delivered
        directly to your end customers, without any order minimums. This empowers you to create and
        personalize a diverse range of products quickly without making any investments, all under
        your own unique brand. Sell more and save more! As your sales grow, you can enjoy monthly
        incentives and receive special discounts.
      </p>
    </AnimatePresence>
  );
};
