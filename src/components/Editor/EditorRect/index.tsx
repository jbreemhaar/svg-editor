import useDrag from "../../../hooks/useDrag";
import { EditMode } from "../../Editor";
import classNamesFromArray from "../../../utils/classNamesFromArray";
import "./index.css";
import { Vertice } from "../../../types/AreaOverlay";

interface Props {
  vertice: Vertice;
  onChangeRect: (e: MouseEvent, idx: number) => void;
  idx: number;
  editMode: EditMode;
  onRemovePoint: (idx: number) => void;
  setActiveVertice: (id: number) => void;
  activeVertice: number | null;
}

/**
 * draggable rects 'plopped' on polygon points
 */
export default function EditorRect(props: Props) {
  const {
    vertice,
    onChangeRect,
    idx,
    editMode,
    onRemovePoint,
    setActiveVertice,
    activeVertice,
  } = props;
  const isActive = activeVertice === idx;
  const verticeRectSize = editMode === EditMode.Remove || isActive ? 20 : 10;
  const { ref } = useDrag({ onMove, onDown }, [activeVertice]);

  /**
   * on pointer down
   */
  function onDown() {
    setActiveVertice(idx);
    if (editMode === EditMode.Remove) onRemovePoint(idx);
  }

  /**
   * on pointer move
   */
  function onMove(e: MouseEvent) {
    if ([EditMode.Move, EditMode.Add].includes(editMode)) onChangeRect(e, idx);
  }

  return (
    <rect
      className={classNamesFromArray([
        "editor__rect",
        `editor__rect--mode-${editMode}`,
        isActive && "editor__rect--active",
      ])}
      data-index={idx}
      ref={ref}
      width={verticeRectSize}
      height={verticeRectSize}
      x={vertice.x - verticeRectSize / 2}
      y={vertice.y - verticeRectSize / 2}
    />
  );
}
