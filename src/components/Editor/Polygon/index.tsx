import PolygonEditGroup from "../PolygonEditGroup";
import NormalPolygon from "../NormalPolygon";
import { AreaOverlay } from "../../../types/AreaOverlay";
import { RefObject } from "react";
import { EditMode } from "../../Editor";

interface Props {
  overlay: AreaOverlay;
  updateOverlay: (overlay: AreaOverlay) => void;
  svgRef: RefObject<SVGSVGElement>;
  setActiveOverlayId: (id: number | null) => void;
  editorControlsRef: RefObject<HTMLDivElement>;
  editMode: EditMode;
  activeOverlayId: number | null;
}

/**
 * View Polgyon
 */
export default function Polygon(props: Props) {
  const {
    overlay,
    updateOverlay,
    svgRef,
    setActiveOverlayId,
    editorControlsRef,
    editMode,
    activeOverlayId,
  } = props;

  /**
   * onExitMode
   */
  function onExitEditMode(updatedOverlay: AreaOverlay) {
    updateOverlay(updatedOverlay);
    setActiveOverlayId(null);
  }

  if (activeOverlayId === overlay.id)
    return (
      <PolygonEditGroup
        editMode={editMode}
        editorControlsRef={editorControlsRef}
        svgRef={svgRef}
        overlay={overlay}
        exitEditMode={onExitEditMode}
      />
    );

  return (
    <NormalPolygon overlay={overlay} setActiveOverlayId={setActiveOverlayId} />
  );
}
