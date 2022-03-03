import overlayVerticesToPolygonPoint from "../../../utils/overlayVerticesToPolygonPoint";
import './index.css';

/**
 * NormalPolygon
 */
export default function NormalPolygon(props) {
  const {overlay, setActiveOverlayId} = props;

  return (
    <g>
      <polygon
        className="normal-polygon"
        onClick={() => setActiveOverlayId(overlay.id)}
        points={overlayVerticesToPolygonPoint(overlay.vertices)}
      />
    </g>
  )
}
