"use client";

import React from "react";
import { Size } from "./index";

export default function Child2({
  sizes,
  setSize,
}: {
  sizes: Size[];
  setSize: React.Dispatch<React.SetStateAction<Size>>; //hover IDE 去複製
}) {
  //
  function handleSetSize(sizing: Size): void {
    alert(sizing);
    setSize(sizing);
  }

  return (
    <div className="mb-2 rounded bg-gray-200">
      <p className="p-2">
        {sizes.map((el) => (
          <button
            className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full ring-1 hover:bg-gray-200 active:bg-gray-300"
            key={el}
            //onClick={() => setSize(el)}
            onClick={() => handleSetSize(el)}
          >
            {el}
          </button>
        ))}
      </p>
    </div>
  );
}
