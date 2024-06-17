"use client"

import React from 'react'
import { Size } from "./index"

export default function Child2({ sizes, setSize }: {
	sizes: Size[],
	setSize: React.Dispatch<React.SetStateAction<Size>>	//hover IDE 去複製
}) {
	//
	function handleSetSize(sizing: Size): void {
		alert(sizing)
		setSize(sizing)
	}

	return (
		<div className=' bg-gray-200 rounded mb-2'>
			<p className='p-2'>
				{
					sizes.map(el => (
						<button
							className=' w-4 h-4 inline-flex justify-center items-center rounded-full ring-1 mr-2 active:bg-gray-300 hover:bg-gray-200'
							key={el}
							//onClick={() => setSize(el)}
							onClick={() => handleSetSize(el)}
						>{el}</button>
					))
				}
			</p>
		</div>
	)
}
