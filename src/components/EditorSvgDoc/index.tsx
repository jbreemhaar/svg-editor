import { RefObject, useRef } from "react";
import Polygon from "../Editor/Polygon";
import classNamesFromArray from "../../utils/classNamesFromArray";
import "./index.css";
import { AreaOverlay } from "../../types/AreaOverlay";
import { EditMode } from "../Editor";

interface Props {
  updateOverlay: (overlay: AreaOverlay) => void;
  overlays: AreaOverlay[];
  setActiveOverlayId: (id: number | null) => void;
  editorControlsRef: RefObject<any>;
  editMode: EditMode;
  activeOverlayId: number | null;
}

/**
 * EditorSvgDocument
 */
export default function EditorSvgDocument(props: Props) {
  const {
    updateOverlay,
    overlays,
    setActiveOverlayId,
    editorControlsRef,
    editMode,
    activeOverlayId,
  } = props;
  const ref = useRef<SVGSVGElement | null>(null);

  return (
    <div
      className="EditorSvgDocument"
      style={{
        background:
          " url(https://sourcepersonaltraining.nl/wp-content/uploads/muscle-cars-pictures-wallpaper1.jpg)",
        backgroundSize: "contain",
      }}
    >
      <svg
        className={classNamesFromArray([
          "svg-doc",
          `svg-doc--mode-${editMode}`,
        ])}
        ref={ref}
        style={{ width: 860, height: 480 }}
      >
        <defs>
          <pattern></pattern>
        </defs>
        {overlays.map((overlay: AreaOverlay) => (
          <Polygon
            svgRef={ref}
            setActiveOverlayId={setActiveOverlayId}
            updateOverlay={updateOverlay}
            editorControlsRef={editorControlsRef}
            key={overlay.id}
            overlay={overlay}
            editMode={editMode}
            activeOverlayId={activeOverlayId}
          />
        ))}
      </svg>
    </div>
  );
}
