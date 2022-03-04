import { useEffect, useRef, useState } from "react";

interface Props {
  onMove?: (e: PointerEvent) => void;
  onDown?: (e: PointerEvent) => void;
  onUp?: (e: PointerEvent) => void;
}

/**
 * reusable drag hook
 */
export default function useDrag(props: Props, deps: any[] = []) {
  const { onMove, onDown, onUp } = props;
  const ref = useRef(null);
  const initPosition = useRef<[number, number]>([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  /**
   * useEffect
   */
  useEffect(() => {
    if (!ref.current) return;
    // cast SVGSVGElement (rect and polygon) to HTMLElement
    // typescript does not work that nice with SVG Elements
    const element = ref.current as HTMLElement;

    /**
     * onPointerMove
     */
    function onPointerMove(e: PointerEvent) {
      if (isDragging) onMove?.(e);
    }

    /**
     * onPointerDown
     */
    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;

      setIsDragging(true);
      initPosition.current = [e.offsetX, e.offsetY];
      onDown?.(e);
    }

    /**
     * onPointerUp
     */
    function onPointerUp(e: PointerEvent) {
      if (e.button !== 0) return;

      setIsDragging(false);
      onUp?.(e);
    }

    element?.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    if (isDragging) {
      document.addEventListener("pointermove", onPointerMove);
    }

    return () => {
      element?.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [ref, isDragging, onMove, onDown, onUp, deps]);

  return {
    ref,
  };
}
