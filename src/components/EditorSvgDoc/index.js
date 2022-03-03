import { useRef } from "react";
import Polygon from "../Editor/Polygon";
import classNamesFromArray from "../../utils/classNamesFromArray";
import './index.css';

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
        className={classNamesFromArray(['svg-doc', `svg-doc--mode-${editMode}`])}
        ref={ref}
        style={{width: 860, height: 480}}>
        <defs>
          <pattern></pattern>
        </defs>
        {overlays.map((overlay) => (
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
