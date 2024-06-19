"use client";

import React, { useState } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child3 from "./Child3";
import Child4 from "./Child4";
import Child5 from "./Child5";

export type Size = "S" | "M" | "L";

export default function Index() {
  //
  const [size, setSize] = useState<Size>("S");
  const sizes: Size[] = ["S", "M", "L"]; //精華

  return (
    <div className="mx-auto my-3 max-w-96">
      <div className="relative rounded border p-2">
        <b
          className={
            "absolute left-4 top-3 block bg-orange-100 text-2xl text-gray-500 transition-all " +
            (size === "M"
              ? "scale-125 text-blue-500"
              : size === "L"
                ? " scale-150 text-green-400"
                : size === "S"
                  ? " scale-100 text-orange-400"
                  : "")
          }
        >
          尺寸
        </b>

        <p className="py-2 text-right">
          {sizes.map((el) => (
            <button
              className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full ring-1 hover:bg-gray-200 active:bg-gray-300"
              key={el}
              onClick={() => setSize(el)}
            >
              {el}
            </button>
          ))}
        </p>
        <p className="flex items-end justify-start py-2">
          <b>現在是</b>
          <b>{size === "M" ? "中" : size === "L" ? "大" : "小"}</b>
        </p>

        <div className="border bg-gray-100 p-4">
          <Child1 {...{ sizes, setSize }}></Child1>
          <Child2 {...{ sizes, setSize }}></Child2>
          <Child3 {...{ size, sizes, setSize }}></Child3>
          <Child4 {...{ size, sizes, setSize }}></Child4>
          <Child5 {...{ size, sizes, setSize }}></Child5>
        </div>
      </div>
    </div>
  );
}
