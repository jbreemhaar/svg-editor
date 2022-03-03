import { useState, useRef } from "react";
import ViewPolygon from "./Editor/ViewPolygon";

/**
 * EditorSvgDocument
 */
export default function EditorSvgDocument(props) {
  const {updateOverlay, overlays, setActiveOverlayId, editorControlsRef, editMode, activeOverlayId} = props;
  const ref = useRef();

  return (
    <div className="EditorSvgDocument" style={{
      background:' url(https://sourcepersonaltraining.nl/wp-content/uploads/muscle-cars-pictures-wallpaper1.jpg)',
      backgroundSize: 'contain',
    }}>
      <svg
        ref={ref}

        style={{width: 860, height: 480}}>
        <defs>
          <pattern></pattern>
        </defs>
        {overlays.map((overlay) => (
          <ViewPolygon
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
