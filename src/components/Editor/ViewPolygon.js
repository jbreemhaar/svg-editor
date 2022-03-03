import {useEffect, useState} from "react";
import overlayVerticesToPolygonPoint from "../../utils/overlayVerticesToPolygonPoint";
import Polygon from "./Polygon";

/**
 * View Polgyon
 */
export default function ViewPolygon(props) {
  const {overlay, updateOverlay, svgRef, setActiveOverlayId, editorControlsRef, editMode, activeOverlayId} = props;

  /**
   * onExitMode
   * @param updatedOverlay
   */
  function onExitEditMode(updatedOverlay) {
    updateOverlay(updatedOverlay);
    setActiveOverlayId(null);
  }

  if (activeOverlayId === overlay.id) return (
    <Polygon
      editMode={editMode}
      editorControlsRef={editorControlsRef}
      svgRef={svgRef}
      overlay={overlay}
      exitEditMode={onExitEditMode}
      setActiveOverlayId={setActiveOverlayId}
    />
  )

  return (
    <g>
      <polygon
        onClick={() => setActiveOverlayId(overlay.id)}
        style={{
          cursor: 'pointer',
          fill: 'rgba(0, 0, 0, 0.44)',
          stroke: '#f7f7f7',
          strokeWidth: 2
      }}
        points={overlayVerticesToPolygonPoint(overlay.vertices)}
      />
    </g>
  )
}
