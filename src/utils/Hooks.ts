import { useEffect, useRef, useState } from "react";

export function useHoverEvent() {
  const [isHovering, setIsHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    node.addEventListener("mouseenter", onMouseEnter);
    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (node) {
        node.removeEventListener("mouseenter", onMouseEnter);
        node.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return {
    ref,
    isHovering,
  };
}
