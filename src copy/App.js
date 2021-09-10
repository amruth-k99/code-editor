import "./App.css";
import Split from "react-split";
import ProblemStatement from "./Problem";
import RightPanel from "./RightPanel";

function App() {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Split className="split" sizes={[40, 60]} minSize={300}>
        <ProblemStatement />
        <RightPanel />
      </Split>
    </div>
  );
}

export default App;
