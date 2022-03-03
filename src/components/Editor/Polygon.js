import {useState} from "react";
import EditorRect from "./EditorRect";
import useDrag from "../../hooks/useDrag";
import EditorPolygon from "./EditorPolygon";
import {EDIT_MODES} from "../Editor";

/**
 * single polygon
 */
export default function Polygon(props) {
  const { overlay, exitEditMode, editorControlsRef, editMode, svgRef} = props;
  const [overlayState, setOverlayState] = useState(overlay);
  const { ref } = useDrag({ onUp}, [editMode, overlay]);

  /**
   * only exit when not clicking polygon itself, or the related controls menu
   */
  function onUp(e) {
    console.log(e);
    if (ref.current.contains(e.target)) return;
    if (editorControlsRef.current.contains(e.target)) return;

    if (editMode === EDIT_MODES.add && (svgRef.current === e.target || svgRef.current.contains(e.target))) {
      console.log(e);
      addPoint([e.offsetX, e.offsetY]);
      return;
    }

    console.log('EXIT', editMode, svgRef.current, e.target, svgRef.current === e.target, svgRef.current.contains(e.target));
    exitEditMode(overlayState)
  }

  /**
   * onChangeRect
   */
  function onChangeRect(e, idx) {
    const vertices = [...overlayState.vertices].map((vertice, i) => {
      if (i === idx) return {x: e.offsetX, y: e.offsetY };
      return {x: vertice.x, y: vertice.y};
    });

    setOverlayState({ ...overlayState, vertices });
  }

  /**
   * addpoint
   */
  function addPoint([x,y], idx) {
    const index = idx !== undefined ? idx : overlayState.vertices.length - 1;
    const vertices = [...overlayState.vertices];
    vertices.splice(index, 0, {x,y})
    setOverlayState({ ...overlayState, vertices });
  }

  /**
   * remove point
   */
  function onRemovePoint(idx) {
    const vertices = [...overlayState.vertices].filter((vert, i) => i !== idx);
    setOverlayState({ ...overlayState, vertices });
  }

  /**
   * onChangePolygon position
   */
  function onChangePolygon(vertices) {
    setOverlayState({ ...overlayState, vertices });
  }

  return (
    <g ref={ref}>
      <EditorPolygon editMode={editMode} onChangePolygon={onChangePolygon} overlay={overlayState}  />
      {overlayState.vertices.map((vertice, idx) => (
        <EditorRect
          editMode={editMode}
          onChangeRect={onChangeRect}
          idx={idx}
          key={idx}
          vertice={vertice}
          onRemovePoint={onRemovePoint}
        />
      ))}
    </g>
  );
}
