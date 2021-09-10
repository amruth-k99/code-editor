import React, { useState } from "react";
import Split from "react-split";
import {
  // Encode a string in base-64
  btoa,
  // Decode a string in base-64
  atob,
} from "b2a";

import Ace from "./Ace";
import "./editor.css";
import languages from "./languages";
import EditorMenu from "./editorMenu";
import APIAlert from "./apiAlert";
import SubmitArea from "./submitArea";
import MenuTabs from "./MenuTabs";

const responses = {
  "": "",
  0: "Passed",
  1: "Wrong",
  2: "Run time Error",
  3: "Compilation Error",
  4: "Time limit Exceedded",
  5: "Memory limit Exceeded",
};

const RightPanel = () => {
  const [state, setState] = useState({
    language: 71,
    theme: "dawn",
    code: "# Write your code",
    stdin: "",
    loading: false,
    responseTime: "",
    runStatus: "",
    selectedMenu: 0,
    results: [],
    response: null,
    running: false,
    submitting: false,
    error: null,
    apiFail: false,
  });

  const onCodeSubmit = () => {
    setState({
      ...state,
      response: null,
      runStatus: "",
      responseTime: null,
      error: null,
      submitting: true,
    });
    let url = window.location.href;
    url = url.split("qid=");

    fetch(
      "https://63kvlnkhcg.execute-api.ap-south-1.amazonaws.com/default/python_test_cases",
      {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qid: url[1],
          code: btoa(state.code),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState({
          ...state,
          response: null,
          results: data,
          selectedMenu: 1,
          error: atob(data.error || ""),
        });

        let all_string = `${url[1]}${data.length}`;
        console.log(data);
        console.log(data.length);
        data.forEach((test) => {
          all_string = all_string + `${test.answer}`;
        });

        window.top.postMessage(all_string, "*");
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, apiFail: true });
      });
  };

  const onCodeRun = () => {
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
        console.log("results", data);
        if (data.error !== "") {
          console.log(atob(data.error));
          setState({
            ...state,
            responseTime: data.time,
            selectedMenu: 0,
            response: null,
            error: atob(data.error),
          });
        } else {
          setState({
            ...state,
            selectedMenu: 0,
            responseTime: data.time,
            response: atob(data.out),
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.error);
        setState({ ...state, apiFail: true });
      });
  };

  return (
    <Split
      direction="vertical"
      sizes={[60, 40]}
      gutterSize={15}
      minSize={[50, 20]}
      className="right-panel"
    >
      <div>
        <div
          className="overflow-y-scroll flex flex-col"
          style={{ height: "100%" }}
        >
          {state.apiFail && (
            <APIAlert close={() => setState({ ...state, apiFail: false })} />
          )}
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
            submitting={state.submitting}
            onCodeSubmit={() => {
              setState({ ...state, selectedMenu: 1 });
              if (!state.submitting) onCodeSubmit();
            }}
            onCodeRun={() => {
              if (!state.running) onCodeRun();
            }}
          />
        </div>
      </div>
      {/*  */}

      <div className="results-view">
        <MenuTabs
          selectedMenu={state.selectedMenu}
          selected={(e) => {
            setState({ ...state, selectedMenu: e });
          }}
        />

        {state.selectedMenu === 0 && (
          <CustomInput state={state} setState={(e) => setState(e)} />
        )}

        {state.selectedMenu === 1 && (
          <TestCasesResults state={state} setState={(e) => setState(e)} />
        )}

        {state.selectedMenu === 2 && (
          <CodeResults state={state} setState={(e) => setState(e)} />
        )}
      </div>
    </Split>
  );
};

export default RightPanel;

const CustomInput = ({ state, setState }) => {
  return (
    <div className="overflow-y-scroll">
      <div className="flex text-sm flex-col p-2">
        {state.responseTime && (
          <h2 className="text-lg font-bold text-green-700">
            {state.runStatus !== "" && state.runStatus === 0 ? (
              <span className="text-green-700"> Accepted</span>
            ) : (
              <span className="text-red-700">{responses[state.runStatus]}</span>
            )}{" "}
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
              rows={2}
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
              <textarea
                style={{ width: "100%" }}
                rows={4}
                defaultValue={state.error}
                disabled
                className="flex border-none p-2 text-sm rounded-sm"
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CodeResults = ({ state, setState }) => {
  return (
    <div className="overflow-y-scroll">
      <div className="flex text-sm flex-col p-2">
        {state.responseTime && (
          <h2 className="text-lg font-bold text-green-700">
            {state.runStatus !== "" && state.runStatus === 0 ? (
              <span className="text-green-700"> Accepted</span>
            ) : (
              <span className="text-red-700">{responses[state.runStatus]}</span>
            )}{" "}
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
  );
};

const TestCasesResults = ({ state, setState }) => {
  return (
    <div className="overflow-y-scroll">
      <div className="flex text-sm flex-col p-2">
        <h3 className="font-bold text-lg">Test Case Results:</h3>
        <div class="flex flex-col">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
            <div class="shadow border-b border-gray-200 sm:rounded-lg">
              <table class="divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  {state.results.map((result, k) => (
                    <tr key={k}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Testcase #{k + 1} :
                      </td>
                      {
                        <td class="px-6 py-4 whitespace-nowrap text-md text-black font-bold">
                          {responses[result.status]}
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
