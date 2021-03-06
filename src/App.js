import "./App.css";
import Split from "react-split";
import RightPanel from "./components/RightPanel";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Split className="split" sizes={[100]} minSize={0}>
        <RightPanel />
      </Split>
    </div>
  );
}

export default App;
