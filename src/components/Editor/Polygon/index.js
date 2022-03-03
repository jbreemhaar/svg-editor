import PolygonEditGroup from "../PolygonEditGroup";
import NormalPolygon from "../NormalPolygon";

/**
 * View Polgyon
 */
export default function Polygon(props) {
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
    <PolygonEditGroup
      editMode={editMode}
      editorControlsRef={editorControlsRef}
      svgRef={svgRef}
      overlay={overlay}
      exitEditMode={onExitEditMode}
      setActiveOverlayId={setActiveOverlayId}
    />
  )

  return (
    <NormalPolygon overlay={overlay} setActiveOverlayId={setActiveOverlayId}/>
  )
}
