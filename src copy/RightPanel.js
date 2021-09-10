import React, { useState } from "react";
import Split from "react-split";
import {
  // Encode a string in base-64
  btoa,
  // Decode a string in base-64
  atob,

  // Encode a string into base64url
  btoau,
  // Decode a base64url-encoded string
  atobu,
} from "b2a";

import Ace from "./Ace";
import "./editor.css";
import languages from "./components/languages";
import EditorMenu from "./components/editorMenu";
import SubmitArea from "./components/submitArea";
import MenuTabs from "./components/MenuTabs";

const RightPanel = () => {
  const [state, setState] = useState({
    language: 71,
    theme: "dawn",
    code: "# Write your code",
    stdin: "",
    loading: false,
    responseTime: "",
    response: null,
    running: false,
    error: null,
  });

  const onCodeSubmit = () => {
    setState({
      ...state,
      response: null,
      responseTime: null,
      error: null,
      running: true,
    });

    fetch(
      "https://4qwixrr8h4.execute-api.ap-south-1.amazonaws.com/default/python-sandbox",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: btoa(state.code),
          stdin: btoa(state.stdin),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error !== "") {
          setState({
            ...state,
            responseTime: data.time,
            response: null,
            error: atob(data.error),
          });
        } else {
          console.log(data, atob(data.out));
          setState({
            ...state,
            responseTime: data.time,
            response: atob(data.out),
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, error: err });
      });
  };

  return (
    <Split
      direction="vertical"
      sizes={[60, 40]}
      gutterSize={5}
      minSize={[50, 20]}
      className="right-panel"
    >
      <div>
        <div
          className="overflow-y-scroll flex flex-col"
          style={{ height: "100%" }}
        >
          <EditorMenu
            language={state.language}
            theme={state.theme}
            onLanguageChage={(e) => {
              setState({ ...state, language: e });
            }}
            onThemeChage={(e) => {
              console.log(e);
              setState({ ...state, theme: e });
            }}
          />
          <Ace
            onChange={(e) => {
              console.log(e);
              setState({ ...state, code: e });
            }}
            code={state.code}
            mode={languages[state.language].mode}
            theme={state.theme}
          />

          <SubmitArea
            running={state.running}
            onCodeSubmit={() => {
              if (!state.running) onCodeSubmit();
            }}
          />
        </div>
      </div>
      {/*  */}

      <div className="results-view">
        <MenuTabs />
        <div className="overflow-y-scroll">
          <div className="flex text-sm flex-col p-2">
            {state.responseTime && (
              <h2 className="text-lg font-bold text-green-700">
                Accepted{" "}
                <span className="text-gray-400 font-semibold text-base">
                  Runtime: {parseFloat(state.responseTime).toFixed(3)} ms
                </span>
              </h2>
            )}
            {/* One  */}
            <div className="flex mt-3">
              <p className="w-28 align-middle font-semibold my-auto">
                Your input :{" "}
              </p>
              <div
                style={{ width: "100%" }}
                className="border flex p-2 text-sm border-gray-200 rounded-sm"
              >
                <textarea
                  style={{ width: "100%" }}
                  rows={4}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setState({ ...state, stdin: e.target.value });
                  }}
                  defaultValue={state.stdin}
                  className="flex border-none p-2 text-sm rounded-sm"
                ></textarea>
              </div>
            </div>
            {state.response && (
              <div className="flex mt-3">
                <p className="w-28 align-middle font-semibold text-yellow-500 my-auto">
                  StdOut :{" "}
                </p>
                <div
                  style={{ width: "100%" }}
                  className="border flex p-2 text-sm border-gray-200 rounded-sm"
                >
                  <textarea
                    style={{ width: "100%" }}
                    rows={4}
                    defaultValue={state.response}
                    disabled
                    className="flex border-none p-2 text-sm rounded-sm"
                  ></textarea>
                </div>
              </div>
            )}
            {/* One  */}
            {state.error && (
              <div className="flex mt-3">
                <p className="w-28 align-middle text-red-600 font-semibold my-auto">
                  Error :{" "}
                </p>
                <div
                  style={{ width: "100%" }}
                  className="border flex p-2 text-sm border-gray-200 rounded-sm"
                >
                  <code className="">
                    [2,7,11,15]
                    <br /> 9
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Split>
  );
};

export default RightPanel;
