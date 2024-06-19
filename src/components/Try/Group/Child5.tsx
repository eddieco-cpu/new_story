"use client";

import React from "react";
import { Size } from "./index";

export default function Child1({
  size,
  sizes,
  setSize,
}: {
  size: Size;
  sizes: Size[];
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  //
  function handleSetSize(val: number): void {
    setSize(sizes[val - 1]);
  }

  return (
    <div className="mb-2 rounded bg-gray-200">
      <p className="p-2">
        <input
          type="range"
          min={1}
          max={sizes.length}
          value={size === "S" ? 1 : size === "M" ? 2 : 3}
          onChange={(e) => handleSetSize(Number(e.target.value))}
        />
      </p>
    </div>
  );
}
