import { useState, useRef, RefObject } from "react";
import EditorRect from "../EditorRect";
import useDrag from "../../../hooks/useDrag";
import EditorPolygon from "../EditorPolygon";
import { EDIT_MODES, EditMode } from "../../Editor";
import { AreaOverlay, Vertice } from "../../../types/AreaOverlay";

interface Props {
  overlay: AreaOverlay;
  exitEditMode: (overlays: AreaOverlay) => void;
  editMode: EditMode;
  svgRef: RefObject<SVGSVGElement>;
  editorControlsRef: RefObject<HTMLDivElement>;
}

/**
 * PolygonEditGroup
 */
export default function PolygonEditGroup(props: Props) {
  const { overlay, exitEditMode, editorControlsRef, editMode, svgRef } = props;
  const [overlayState, setOverlayState] = useState<AreaOverlay>(overlay);
  const [activeVertice, setActiveVertice] = useState<number>(
    overlay.vertices.length - 1 || 0
  );
  const { ref } = useDrag({ onUp }, [editMode, overlay, activeVertice]);
  const rectGroupRef = useRef<SVGGElement>(null);

  /**
   * only exit when not clicking polygon itself, or the related controls menu
   */
  function onUp(e: MouseEvent) {
    const target = e.target as Node;
    if (!target) return;
    if (editMode === EDIT_MODES.remove) return;

    // if add mode
    // and click is *not* on the rects themselves
    // and the target is part of svg doc OR is svg doc
    if (
      editMode === EDIT_MODES.add &&
      !rectGroupRef.current?.contains(target) &&
      (svgRef.current === e.target || svgRef.current?.contains(target))
    ) {
      addPoint([e.offsetX, e.offsetY], activeVertice + 1);
    }

    const current = ref.current as SVGGElement | null;

    if (editMode === EDIT_MODES.move) {
      if (current?.contains(target)) return;
      if (editorControlsRef.current?.contains(target)) return;
      exitEditMode(overlayState);
    }
  }

  /**
   * onChangeRect
   */
  function onChangeRect(e: MouseEvent, idx: number) {
    const vertices = [...overlayState.vertices].map((vertice, i) => {
      if (i === idx) return { x: e.offsetX, y: e.offsetY };
      return { x: vertice.x, y: vertice.y };
    });

    setOverlayState({ ...overlayState, vertices });
  }

  /**
   * addpoint
   */
  function addPoint([x, y]: [x: number, y: number], idx: number) {
    const index = idx !== undefined ? idx : overlayState.vertices.length - 1;
    const vertices = [...overlayState.vertices];
    vertices.splice(index, 0, { x, y });
    setOverlayState({ ...overlayState, vertices });
    setActiveVertice(idx);
  }

  /**
   * remove point
   */
  function onRemovePoint(idx: number) {
    const vertices = [...overlayState.vertices].filter(
      (_: Vertice, i) => i !== idx
    );
    setOverlayState({ ...overlayState, vertices });

    // making previous point active
    if (idx - 1 >= 0) {
      setActiveVertice(idx - 1);
      return;
    }
    setActiveVertice(overlayState.vertices.length - 1);
  }

  /**
   * onChangePolygon position
   */
  function onChangePolygon(vertices: Vertice[]) {
    setOverlayState({ ...overlayState, vertices });
  }

  /**
   * @return React$Node
   */
  return (
    <g ref={ref}>
      <EditorPolygon
        editMode={editMode}
        onChangePolygon={onChangePolygon}
        overlay={overlayState}
      />
      <g ref={rectGroupRef}>
        {overlayState.vertices.map((vertice, idx) => (
          <EditorRect
            editMode={editMode}
            activeVertice={activeVertice}
            onChangeRect={onChangeRect}
            idx={idx}
            key={idx}
            vertice={vertice}
            onRemovePoint={onRemovePoint}
            setActiveVertice={setActiveVertice}
          />
        ))}
      </g>
    </g>
  );
}
