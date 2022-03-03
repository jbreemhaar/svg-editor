import {useState} from "react";
import useDrag from "../../hooks/useDrag";
import {EDIT_MODES} from "../Editor";

/**
 * draggable rects 'plopped' on polygon points
 */
export default function EditorRect(props) {
  const { vertice, onChangeRect, idx, editMode, onRemovePoint} = props;
  const verticeRectSize = editMode === EDIT_MODES.remove ? 20 : 10;
  const { ref } = useDrag({ onMove });

  function onDown() {
    if (editMode === EDIT_MODES.remove) {
      onRemovePoint(idx)
    }
  }

  function onMove(e) {
    if (editMode !== EDIT_MODES.move) return;
    onChangeRect(e, idx)
  }

  let cursor = 'default';
  if (editMode === EDIT_MODES.move) cursor = 'move';
  if (editMode === EDIT_MODES.remove) cursor = 'not-allowed';

  return (
    <rect
      onClick={onDown}
      data-index={idx}
      ref={ref}
      style={{ fill: "red", cursor}}
      width={verticeRectSize}
      height={verticeRectSize}
      x={vertice.x - verticeRectSize / 2}
      y={vertice.y - verticeRectSize / 2}
    />
  );
}
