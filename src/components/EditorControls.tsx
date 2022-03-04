import { RefObject } from "react";
import { EditMode } from "./Editor";

interface Props {
  activeOverlayId: number | null;
  setEditMode: (mode: EditMode) => void;
  editMode: EditMode;
  editControlsRef: RefObject<HTMLDivElement>;
  addNew: () => void;
  removeOverlay: (activeOverlayId: number) => void;
}

/**
 * Editor Controls
 */
export default function EditorControls(props: Props) {
  const {
    activeOverlayId,
    setEditMode,
    editMode,
    editControlsRef,
    addNew,
    removeOverlay,
  } = props;
  return (
    <div className="EditorControls">
      {activeOverlayId ? (
        <div ref={editControlsRef}>
          <div>edit</div>
          <div>
            <div>
              <button
                disabled={editMode === EditMode.Move}
                type="button"
                onClick={() => setEditMode(EditMode.Move)}
              >
                move points
              </button>
            </div>
            <div>
              <button
                disabled={editMode === EditMode.Add}
                type="button"
                onClick={() => setEditMode(EditMode.Add)}
              >
                add points
              </button>
            </div>
            <div>
              <button
                disabled={editMode === EditMode.Remove}
                type="button"
                onClick={() => setEditMode(EditMode.Remove)}
              >
                remove points
              </button>
            </div>
            <hr />
            <div>
              <button
                type="button"
                onClick={() => removeOverlay(activeOverlayId)}
              >
                remove overlay
              </button>
            </div>
          </div>

          <hr />
        </div>
      ) : null}
      <div>
        <div>controls</div>
        <button type="button" onClick={() => addNew()}>
          add new
        </button>
      </div>
    </div>
  );
}
