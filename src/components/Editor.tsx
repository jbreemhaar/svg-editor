import EditorControls from "./EditorControls";
import EditorSvgDoc from "./EditorSvgDoc";
import "../styles.css";
import { useState, useRef } from "react";
import { AreaOverlay } from "../types/AreaOverlay";

const state = JSON.parse(localStorage.getItem("state") || "");
const fallbackState = [
  {
    type: "area",
    id: 1,
    vertices: [
      { x: 76.45703125, y: 357.859375 },
      { x: 78.45703125, y: 304.859375 },
      { x: 279.45703125, y: 267.859375 },
      { x: 424, y: 258 },
      { x: 428.45703125, y: 318.859375 },
    ],
    event: "seek",
    seekTime: 16,
    startTime: { hour: 0, minute: 0, second: 0 },
    stopTime: { hour: 0, minute: 0, second: 30 },
  },
];

export enum EditMode {
  Move = "move",
  Add = "add",
  Remove = "remove",
}

// todo ronde hoeken, kijk of dat kan
//    - ja, polygons to shape
// yes: add:modus moet punt kunnen aanklikken om vanaf daar te kunnen adden
// yes: moving moet cursor andersom
// yes: punten toevoegen kan niet in de shape zelf
// yes: bij add modus moet punt ook versleept kunnen worden, en point moet actief worden om vanaf dat punt toe te voegen
// yes: actieve vertice
// delete is forbidden icon.
// reset edit mode op select van overlay

// nice to have; keyboard controls
// nice to have: als je klikt op de lijn bij toevoegen, dan tussen die toevoegen.

/**
 * Editor
 */
export default function Editor() {
  const [areaOverlays, setAreaOverlays] = useState<AreaOverlay[]>(
    state || fallbackState
  );
  const [activeOverlayId, setActiveOverlayId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(EditMode.Move);
  const editorControlsRef = useRef<HTMLDivElement>(null);

  /**
   * update overlay
   */
  function updateOverlay(updatedOverlay: AreaOverlay) {
    const newState = [
      ...areaOverlays.map((overlay: AreaOverlay) => {
        if (overlay.id !== updatedOverlay.id) return { ...overlay };
        return { ...updatedOverlay };
      }),
    ];
    saveState(newState);
  }

  /**
   * save state
   */
  function saveState(newState: AreaOverlay[]) {
    localStorage.setItem("state", JSON.stringify(newState));
    setAreaOverlays(newState);
  }

  /**
   * remove overlay
   */
  function removeOverlay(rId: number) {
    const newState = [...areaOverlays.filter(({ id }) => rId !== id)];
    saveState(newState);
    setActiveOverlayId(null);
  }

  /**
   * add new overlay
   */
  function addNew() {
    const newOverlay = {
      id: Date.now(),
      vertices: [],
    };
    const newState = [...areaOverlays, newOverlay];
    setActiveOverlayId(newOverlay.id);
    setEditMode(EditMode.Add);
    saveState(newState);
  }

  return (
    <div className="Editor">
      <EditorSvgDoc
        activeOverlayId={activeOverlayId}
        editMode={editMode}
        editorControlsRef={editorControlsRef}
        overlays={areaOverlays}
        setActiveOverlayId={setActiveOverlayId}
        updateOverlay={updateOverlay}
      />
      <EditorControls
        removeOverlay={removeOverlay}
        addNew={addNew}
        editControlsRef={editorControlsRef}
        editMode={editMode}
        setEditMode={setEditMode}
        activeOverlayId={activeOverlayId}
      />
    </div>
  );
}
