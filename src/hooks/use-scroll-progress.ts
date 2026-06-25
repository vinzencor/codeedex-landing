import { useEffect, useState } from "react";

/**
 * Custom hook to track the scroll progress of a target element from 0 to 1.
 * 0: The element's top starts entering the viewport.
 * 1: The element's bottom fully leaves the viewport.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // The scroll range is from when the top of the element enters the bottom of the viewport
      // to when the bottom of the element leaves the top of the viewport.
      const totalRange = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;

      let p = scrolled / totalRange;
      p = Math.max(0, Math.min(1, p));

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return progress;
}
