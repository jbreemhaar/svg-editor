import EditorControls from "./EditorControls";
import EditorSvgDocument from "./EditorSvgDocument";
import styles from "../styles.css";
import {useState, useRef} from "react";

const state22 = JSON.parse(localStorage.getItem('state'));
const state = [{"type":"area","id":1,"vertices":[{"x":76.45703125,"y":357.859375},{"x":78.45703125,"y":304.859375},{"x":279.45703125,"y":267.859375},{"x":424,"y":258},{"x":428.45703125,"y":318.859375}],"event":"seek","seekTime":16,"startTime":{"hour":0,"minute":0,"second":0},"stopTime":{"hour":0,"minute":0,"second":30}}];

export const EDIT_MODES = Object.freeze({
  move: 'move',
  add: 'add',
  remove: 'remove',
});

export default function Editor() {
  const [areaOverlays, setAreaOverlays] = useState(state);
  const [activeOverlayId, setActiveOverlayId] = useState(null);
  const [editMode, setEditMode] = useState(EDIT_MODES.move);
  const editorControlsRef = useRef();

  /**
   * update overlay
   * @param {*} updatedOverlay
   */
  function updateOverlay(updatedOverlay) {
    const newState = [
      ...areaOverlays.map((overlay) => {
        if (overlay.id !== updatedOverlay.id) return {...overlay};
        return {...updatedOverlay};
      })
    ];
    saveState(newState);
  }

  /**
   * save state
   * @param newState
   */
  function saveState(newState) {
    localStorage.setItem('state', JSON.stringify(newState));
    setAreaOverlays(newState);
  }

  /**
   * remove overlay
   * @param id
   */
  function removeOverlay(rId) {
    const newState = [
      ...areaOverlays.filter(({id}) => rId !== id)
    ];
    saveState(newState);
    setActiveOverlayId(null);
  }

  /**
   * addnew
   */
  function addNew() {
    const newOverlay = {
      id: Date.now(),
      vertices: [],

    }
    const newState = [
      ...areaOverlays,
      newOverlay
    ];
    setActiveOverlayId(newOverlay.id);
    setEditMode(EDIT_MODES.add);
    saveState(newState);
  }

  return (
    <div className="Editor">
      <EditorSvgDocument activeOverlayId={activeOverlayId} editMode={editMode} editorControlsRef={editorControlsRef} overlays={areaOverlays} setActiveOverlayId={setActiveOverlayId} updateOverlay={updateOverlay} />
      <EditorControls removeOverlay={removeOverlay} addNew={addNew} editControlsRef={editorControlsRef} editMode={editMode} setEditMode={setEditMode} activeOverlayId={activeOverlayId}/>
    </div>
  );
}
