import EditorControls from "./EditorControls";
import EditorSvgDocument from "./EditorSvgDocument";
import styles from "../styles.css";

export default function Editor() {
  return (
    <div className="Editor">
      <EditorSvgDocument />
      <EditorControls />
    </div>
  );
}
