"use client"

import React from 'react'
import { Size } from "./index"

export default function Child2({ size, sizes, setSize }: {
	size: Size,
	sizes: Size[],
	setSize: React.Dispatch<React.SetStateAction<Size>>
}) {
	//
	function handleSetSize(sizing: Size): void {
		console.log(sizing)
		setSize(sizing)
	}

	return (
		<div className=' bg-gray-200 rounded mb-2'>
			{/**
			 * 寫法一
			 * 硬給 type
			 * onChange={(e) => handleSetSize(e.target.value as Size)}
			 */}
			<select value={size} onChange={(e) => handleSetSize(e.target.value as Size)} className=' focus:outline-0 focus:border-spacing-0 focus:bg-yellow-50'>
				{
					sizes.map(el => (
						<option
							className=' w-4 h-4 inline-flex justify-center items-center rounded-full ring-1 mr-2 active:bg-gray-300 hover:bg-gray-200'
							key={el}
							value={el}
						>{el}</option>
					))
				}
			</select>
		</div>
	)
}
