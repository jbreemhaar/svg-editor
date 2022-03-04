import overlayVerticesToPolygonPoint from "../../../utils/overlayVerticesToPolygonPoint";
import "./index.css";
import { AreaOverlay } from "../../../types/AreaOverlay";

interface Props {
  setActiveOverlayId: (id: number | null) => void;
  overlay: AreaOverlay;
}

/**
 * NormalPolygon
 */
export default function NormalPolygon(props: Props) {
  const { overlay, setActiveOverlayId } = props;

  return (
    <g>
      <polygon
        className="normal-polygon"
        onClick={() => setActiveOverlayId(overlay.id)}
        points={overlayVerticesToPolygonPoint(overlay.vertices)}
      />
    </g>
  );
}
