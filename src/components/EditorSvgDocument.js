import { useEffect, useState, useRef } from "react";

const state = [
  {
    type: "area",
    id: 1,
    vertices: [
      { x: 20, y: 70 },
      { x: 20, y: 20 },
      { x: 70, y: 20 },
      { x: 70, y: 70 }
    ],
    event: "seek",
    seekTime: 16,
    startTime: {
      hour: 0,
      minute: 0,
      second: 0
    },
    stopTime: {
      hour: 0,
      minute: 0,
      second: 30
    }
  }
];

/**
 * vertice [x, y] to polygon points
 */
function overlayVerticesToPolygonPoint(vertices) {
  return vertices.map(({ x, y }) => [x, y].join(",")).join(" ");
}

function useDrag(props) {
  const { onMove, onDown } = props;
  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);

  /**
   * useEffect
   */
  useEffect(() => {
    console.log(ref);
    if (!ref.current) return;
    const element = ref.current;

    /**
     * onPointerMove
     */
    function onPointerMove(e) {
      if (isDragging && onMove) onMove(e);
    }

    /**
     * onPointerDown
     */
    function onPointerDown(e) {
      setIsDragging(true);
      console.log("onPointerDown", isDragging);
      if (onDown) onDown(e);
    }

    /**
     * onPointerUp
     */
    function onPointerUp(e) {
      setIsDragging(false);
      console.log("on pointer up", isDragging);
    }

    element.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mousemove", onPointerMove);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mousemove", onPointerMove);
    };
  }, [ref, isDragging]);

  return {
    ref
  };
}

/**
 * draggable rects 'plopped' on polygon points
 */
function EditorRect(props) {
  const { vertice, onClick, onChangeRect, idx } = props;
  console.log(props.blaat);
  const verticeRectSize = 20;
  const { ref } = useDrag({ onMove: (e) => onChangeRect(e, idx) });
  return (
    <rect
      data-index={idx}
      ref={ref}
      style={{ fill: "red" }}
      width={verticeRectSize}
      height={verticeRectSize}
      x={vertice.x - verticeRectSize / 2}
      y={vertice.y - verticeRectSize / 2}
    />
  );
}

/**
 * single polygon
 */
function EditorPolygon(props) {
  const { overlay, updateOverlay } = props;
  const [overlayState, setOverlayState] = useState(overlay);
  const verticesInPoints = overlayVerticesToPolygonPoint(overlayState.vertices);

  /**
   * mutateOverlay
   * @param {*} overlay
   */
  function mutateOverlay(overlay) {
    updateOverlay(overlay);
  }

  function onChangeRect(e, idx) {
    console.log(e, idx);
    const vertices = [...overlayState.vertices];
    vertices[idx] = { x: e.offsetX, y: e.offsetY };
    const newState = { ...overlayState, vertices };
    console.log(newState);
    setOverlayState(newState);
  }

  return (
    <g>
      <polygon points={verticesInPoints} />
      {overlayState.vertices.map((vertice, idx) => (
        <EditorRect
          onChangeRect={onChangeRect}
          idx={idx}
          key={idx}
          vertice={vertice}
        />
      ))}
    </g>
  );
}

/**
 * EditorSvgDocument
 */
export default function EditorSvgDocument() {
  const [areaOverlays, setAreaOverlays] = useState(state);

  /**
   * update overlay
   * @param {*} updatedOverlay
   */
  function updateOverlay(updatedOverlay) {
    const newState = [
      ...areaOverlays.map((overlay) => {
        if (overlay.id === updatedOverlay.id) return updatedOverlay;
        return overlay;
      })
    ];

    setAreaOverlays(newState);
  }

  return (
    <div className="EditorSvgDocument">
      <svg>
        <defs>
          <pattern></pattern>
        </defs>
        {areaOverlays.map((overlay) => (
          <EditorPolygon
            updateOverlay={updateOverlay}
            key={overlay.id}
            overlay={overlay}
          />
        ))}
      </svg>
    </div>
  );
}
