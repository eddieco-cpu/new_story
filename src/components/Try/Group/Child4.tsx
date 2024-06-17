"use client"

import React from 'react'
import { Size } from "./index"

export default function Child2({ size, sizes, setSize }: {
	size: Size,
	sizes: Size[],
	setSize: React.Dispatch<React.SetStateAction<Size>>
}) {
	//重點
	/**
	 * 寫法二 
	 * value is Size：這是一個類型謂詞（type predicate）
	 * 表示如果函數返回 true，那麼傳入的 value 就可以被認為是 Size 類型。--> important!
	 * 這個語法告訴 TypeScript 編譯器在條件成立時，該變量的類型 is Size，
	 * 否則維持 any
	 */
	function isSize(value: any): value is Size { //非常好用
		return sizes.includes(value);
	}

	function handleSetSize(val: string): void {

		if (isSize(val)) {	//重點
			const sizing = val
			alert(sizing);
			setSize(sizing);
		} else {
			console.error(`Invalid size value: ${val}`);
		}
	}

	/** old & bad
		function handleSetSize(val: string): void {
			if (sizes.includes(val as Size)) {
				const sizing = val as Size;
				alert(sizing);
				setSize(sizing);
			} else {
				console.error(`Invalid size value: ${val}`);
			}
		}
	*/

	return (
		<div className=' bg-gray-200 rounded mb-2'>

			<select value={size} onChange={(e) => handleSetSize(e.target.value)} className=' focus:outline-0 focus:border-spacing-0 focus:bg-yellow-50'>
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
			<span className=' ml-2'>better</span>

		</div>
	)
}
