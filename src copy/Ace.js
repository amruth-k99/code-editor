import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "./editor.css";
import ReactResizeDetector from "react-resize-detector";

function Ace(props) {
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => (
        <AceEditor
          mode={props.mode}
          height={`100%/*${height}*/`} // Hack to call resize() properly
          width={`100%/*${width}*/`}
          fontSize={18}
          theme={props.theme}
          keyboardHandler=""
          wrapEnabled={true}
          highlightActiveLine={true}
          value={props.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
            fontFamily: "Source Code Pro",
            scrollPastEnd: 1.0,
          }}
          editorProps={{ $blockScrolling: Infinity }}
          {...props}
        />
      )}
    </ReactResizeDetector>
  );
}

export default Ace;
