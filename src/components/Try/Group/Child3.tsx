"use client";

import React from "react";
import { Size } from "./index";

export default function Child2({
  size,
  sizes,
  setSize,
}: {
  size: Size;
  sizes: Size[];
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  //
  function handleSetSize(sizing: Size): void {
    console.log(sizing);
    setSize(sizing);
  }

  return (
    <div className="mb-2 rounded bg-gray-200">
      {/**
       * 寫法一
       * 硬給 type
       * onChange={(e) => handleSetSize(e.target.value as Size)}
       */}
      <select
        value={size}
        onChange={(e) => handleSetSize(e.target.value as Size)}
        className="focus:border-spacing-0 focus:bg-yellow-50 focus:outline-0"
      >
        {sizes.map((el) => (
          <option
            className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full ring-1 hover:bg-gray-200 active:bg-gray-300"
            key={el}
            value={el}
          >
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
