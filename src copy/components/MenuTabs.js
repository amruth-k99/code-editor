import React, { useState } from "react";
const MenuTabs = (props) => {
  const menu_items = ["Testcase", "Run Code Results", "Tests"];
  const [selected, setSelected] = useState(1);
  return (
    <div className="bg-gray-700 text-white pt-1">
      <nav class="flex space-x-4" aria-label="Tabs">
        {menu_items.map((item, k) => (
          <a
            href="#s"
            key={k}
            onClick={() => setSelected(k)}
            class={
              selected === k
                ? "text-gray-700 hover:text-gray-800 px-3 pb-1 bg-white font-medium text-sm rounded-t-md"
                : "text-white hover:text-gray-100 px-3 font-medium text-sm"
            }
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default MenuTabs;
