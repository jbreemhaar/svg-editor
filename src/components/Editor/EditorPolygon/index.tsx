import { useRef } from "react";
import useDrag from "../../../hooks/useDrag";
import overlayVerticesToPolygonPoint from "../../../utils/overlayVerticesToPolygonPoint";
import { EDIT_MODES, EditMode } from "../../Editor";
import classNamesFromArray from "../../../utils/classNamesFromArray";
import "./index.css";
import { AreaOverlay, Vertice } from "../../../types/AreaOverlay";

interface Props {
  overlay: AreaOverlay;
  onChangePolygon: (vertices: Vertice[]) => void;
  editMode: EditMode;
}

/**
 * EditorPolygon
 */
export default function EditorPolygon(props: Props) {
  const { overlay, onChangePolygon, editMode } = props;
  const verticesInPoints = overlayVerticesToPolygonPoint(overlay.vertices);
  const { ref } = useDrag({ onMove, onDown, onUp }, [editMode, overlay]);
  const initPosRef = useRef<{
    initX: number;
    initY: number;
    vertices: Vertice[];
  }>({ initX: 0, initY: 0, vertices: [] });

  /**
   * save init pos
   */
  function onDown(e: PointerEvent) {
    initPosRef.current = {
      initX: e.clientX,
      initY: e.clientY,
      vertices: overlay.vertices,
    };
  }

  /**
   * reset init pos
   */
  function onUp(_: PointerEvent) {
    initPosRef.current = { initX: 0, initY: 0, vertices: [] };
  }

  /**
   * on Move
   */
  function onMove(e: PointerEvent) {
    if (editMode !== EDIT_MODES.move) return;
    const { initX, initY, vertices: oVertices } = initPosRef.current;
    const poX = e.clientX;
    const poY = e.clientY;
    const x = poX - initX;
    const y = poY - initY;

    // we're applying the diff from the original postition to the state
    // if we'd mutate original values (e.g. lastKnownVertice.x + diff in scroll)
    // we'd be dependent on render cycles.
    const vertices = [...overlay.vertices].map((_: Vertice, idx) => {
      const origVertice = oVertices[idx];
      return {
        x: origVertice.x + x,
        y: origVertice.y + y,
      };
    });

    onChangePolygon(vertices);
  }

  return (
    <polygon
      className={classNamesFromArray([
        "editor__polygon",
        `editor__polygon--mode-${editMode}`,
      ])}
      ref={ref}
      points={verticesInPoints}
    />
  );
}
