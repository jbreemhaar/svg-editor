import {EDIT_MODES} from "./Editor";

/**
 * Editor Controls
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export default function EditorControls(props) {
  const {activeOverlayId, setEditMode, editMode, editControlsRef, addNew, removeOverlay} = props;
  return (
    <div className="EditorControls">
      {activeOverlayId ? (
        <div ref={editControlsRef}>
          <div>edit</div>
          <div>
            <div>
              <button disabled={editMode === EDIT_MODES.move} type="button" onClick={() => setEditMode(EDIT_MODES.move)}>move points</button>
            </div>
            <div>
              <button disabled={editMode === EDIT_MODES.add} type="button" onClick={() => setEditMode(EDIT_MODES.add)}>add points</button>
            </div>
            <div>
              <button disabled={editMode === EDIT_MODES.remove} type="button" onClick={() => setEditMode(EDIT_MODES.remove)}>remove points</button>
            </div>
            <hr/>
            <div>
              <button type="button" onClick={() => removeOverlay(activeOverlayId)} >remove overlay</button>

            </div>
          </div>

          <hr/>
        </div>
      ) : null}
      <div>
        <div>controls</div>
        <button type="button" onClick={() => addNew()}>add new</button>
      </div>

    </div>
  );
}
