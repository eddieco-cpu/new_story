"use client";

import React, { useState } from "react";

export default function ToTop({ className }: { className?: string }) {
	return (
		<button
			className={
				"group fixed bottom-[120px] right-8 z-30 flex aspect-square w-10 rotate-180 items-center justify-center rounded-full bg-white ring-1 ring-ash-350 transition-all duration-500 " +
				` ${className || ""}`
			}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<i className="i-arrow5-down mt-3 block translate-y-[-25%] text-xl text-primary-300 transition-all duration-200 group-hover:animate-bounce group-active:text-accent-300"></i>
		</button>
	);
}
