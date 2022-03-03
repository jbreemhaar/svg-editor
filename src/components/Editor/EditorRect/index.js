import useDrag from "../../../hooks/useDrag";
import {EDIT_MODES} from "../../Editor";
import classNamesFromArray from "../../../utils/classNamesFromArray";
import './index.css';

/**
 * draggable rects 'plopped' on polygon points
 */
export default function EditorRect(props) {
  const { vertice, onChangeRect, idx, editMode, onRemovePoint, setActiveVertice, activeVertice} = props;
  const isActive = activeVertice === idx;
  const verticeRectSize = editMode === EDIT_MODES.remove || isActive ? 20 : 10;
  const { ref } = useDrag({ onMove, onDown }, [activeVertice]);

  /**
   * on pointer down
   */
  function onDown() {
    setActiveVertice(idx);
    if (editMode === EDIT_MODES.remove) onRemovePoint(idx);
  }

  /**
   * on pointer move
   */
  function onMove(e) {
    if ([EDIT_MODES.move, EDIT_MODES.add].includes(editMode)) onChangeRect(e, idx)
  }

  return (
    <rect
      className={classNamesFromArray(['editor__rect', `editor__rect--mode-${editMode}`, (isActive) && 'editor__rect--active'])}
      data-index={idx}
      ref={ref}
      width={verticeRectSize}
      height={verticeRectSize}
      x={vertice.x - verticeRectSize / 2}
      y={vertice.y - verticeRectSize / 2}
    />
  );
}
