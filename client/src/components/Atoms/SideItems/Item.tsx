import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";


function Item() {
  return (
    <div className="w-max">
      <div className="">
        <details className="group">
          <summary
            className="flex cursor-pointer items-center justify-between  bg-gray-50 p-4"
          >
            <h2 >Opcion 1</h2>
            <ChevronDownIcon className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180" />
          </summary>
          
        </details>
      </div>
    </div>
  );
}

export default Item;