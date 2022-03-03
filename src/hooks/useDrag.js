import {useEffect, useRef, useState} from "react";

/**
 * reusable drag hook
 */
export default function useDrag(props, deps = []) {
  const { onMove, onDown, onUp} = props;
  const ref = useRef();
  const initPosition = useRef([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  /**
   * useEffect
   */
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    /**
     * onPointerMove
     */
    function onPointerMove(e) {
      if (isDragging && onMove) onMove(e);
    }

    /**
     * onPointerDown
     */
    function onPointerDown(e) {
      if (e.button !== 0) return;

      setIsDragging(true);
      initPosition.current = [e.offsetX, e.offsetY];
      if (onDown) onDown(e);
    }

    /**
     * onPointerUp
     */
    function onPointerUp(e) {
      if (e.button !== 0) return;

      setIsDragging(false);
      if (onUp) onUp(e);
    }

    element.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    if (isDragging) {
      document.addEventListener("pointermove", onPointerMove);

    }

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [ref, isDragging, onMove, onDown, onUp, ...deps]);

  return {
    ref
  };
}
