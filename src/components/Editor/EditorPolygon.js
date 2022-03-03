import {useRef} from "react";
import useDrag from "../../hooks/useDrag";
import overlayVerticesToPolygonPoint from "../../utils/overlayVerticesToPolygonPoint";
import {EDIT_MODES} from "../Editor";

/**
 * EditorPolygon
 */
export default function EditorPolygon(props) {
  const {overlay, onChangePolygon, editMode} = props;
  const verticesInPoints = overlayVerticesToPolygonPoint(overlay.vertices);
  const { ref } = useDrag({ onMove, onDown, onUp}, [editMode, overlay]);
  const initPosRef = useRef({initX: 0, initY: 0, vertices: []});

  /**
   * save init pos
   * @param e
   */
  function onDown(e) {
    initPosRef.current = {initX: e.clientX, initY: e.clientY, vertices: overlay.vertices};
  }

  /**
   * reset init pos
   * @param e
   */
  function onUp(e) {
    initPosRef.current = {initX: 0, initY: 0, vertices: []};
  }

  /**
   * on Move
   * @param e
   */
  function onMove(e) {
    if (editMode !== EDIT_MODES.move ) return;
    const {initX, initY, vertices: oVertices} = initPosRef.current
    const poX = e.clientX;
    const poY = e.clientY;
    const x = poX - initX;
    const y = poY - initY;

    // we're applying the diff from the original postition to the state
    // if we'd mutate original values (e.g. lastKnownVertice.x + diff in scroll)
    // we'd be dependant on render cycles.
    const vertices  = [...overlay.vertices].map((vertice, idx) => {
      const origVertice = oVertices[idx];
      return ({
        x: origVertice.x + x,
        y: origVertice.y + y,
      })
    })

    onChangePolygon(vertices);
  }

  return(
    <polygon style={{
      cursor: editMode === EDIT_MODES.move ? 'grab' : 'auto',
      fill: 'rgb(255 255 255 / 53%)',
      stroke: 'black',
      strokeWidth: 2
    }} ref={ref} points={verticesInPoints} />
  );
}
