import React, { useState } from "react";
import languages from "./languages";
function EditorMenu(props) {
  const [themes] = useState([
    "monokai",
    "dawn",
    "solarized_dark",
    "solarized_light",
    "textmate",
  ]);
  return (
    <div className="bg-gray-700 text-white py-1">
      <div className="ml-3">
        <nav class="flex justify-between" aria-label="Tabs">
          <div>
            <div class="my-1">
              <select
                id="language"
                name="language"
                defaultValue={props.language}
                onChange={(e) => props.onLanguageChage(e.target.value)}
                class="text-black w-56 text-xs border-gray-300 rounded-sm"
              >
                {Object.entries(languages).map((item, k) => (
                  <option key={k} value={item[0]}>
                    {item[1].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex">
            <p className="text-sm mr-1 my-auto">Theme :</p>
            <div class="my-1">
              <select
                id="theme"
                name="theme"
                defaultValue={props.theme}
                onChange={(e) => props.onThemeChage(e.target.value)}
                class="text-black w-36 mr-4 text-xs border-gray-300 rounded-sm"
              >
                {themes.map((item, k) => (
                  <option key={k} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default EditorMenu;
