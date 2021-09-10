import React from "react";
const MenuTabs = (props) => {
  const menu_items = ["Custom Input", "Tests"];
  return (
    <div className="bg-gray-700 text-white pt-1">
      {props.selected}

      <nav class="flex space-x-4" aria-label="Tabs">
        {menu_items.map((item, k) => (
          <div
            key={k}
            onClick={() => {
              props.selectedMenu(k);
              props.selected(k);
            }}
            class={
              props.selectedMenu === k
                ? "text-gray-700 hover:text-gray-800 px-3 pb-1 bg-white font-medium text-sm rounded-t-md cursor-pointer"
                : "text-white hover:text-gray-100 px-3 font-medium text-sm cursor-pointer"
            }
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MenuTabs;
