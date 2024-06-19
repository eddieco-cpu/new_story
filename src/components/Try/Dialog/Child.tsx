"use client";

import React from "react";

var css = "flex justify-start items-center gap-2 py-2";

export default function Child({
  msg,
  setMsg,
  setDailog,
}: {
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setDailog: (x: string) => void;
}) {
  return (
    <div>
      <p className={css}>
        <input
          type="text"
          className="px-2"
          value={msg}
          onInput={(e) => setMsg((e.target as HTMLInputElement).value)}
        />

        <button
          className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => setDailog(msg)}
        >
          按
        </button>
      </p>
    </div>
  );
}
