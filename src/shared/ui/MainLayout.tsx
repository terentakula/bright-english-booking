import { useLocation, useOutlet } from "react-router-dom";
import { Header } from "./Header";
import type { Variants } from "motion";
import { useLayoutEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.995,
    filter: "blur(3px)",
    transition: {
      duration: 0.22,
      ease: [0.7, 0, 0.84, 1],
    },
  },
};

export function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet()

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  });

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-hidden bg-brand-page text-brand-brown pt-20">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="will-change-transform"
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
