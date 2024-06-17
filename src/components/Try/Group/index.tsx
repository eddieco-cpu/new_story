"use client"

import React, { useState } from 'react'
import Child1 from './Child1'
import Child2 from './Child2'
import Child3 from './Child3'
import Child4 from './Child4'
import Child5 from './Child5'

export type Size = "S" | "M" | "L"

export default function index() {
	//
	const [size, setSize] = useState<Size>("S")
	const sizes: Size[] = ["S", "M", "L"]	//精華

	return (
		<div className='max-w-96 my-3 mx-auto'>
			<div className=' p-2 border rounded relative'>
				<b className={'block absolute top-3 left-4 bg-orange-100 text-2xl text-gray-500 transition-all ' +
					(size === "M" ?
						"scale-125 text-blue-500 " :
						size === "L" ?
							" scale-150 text-green-400 " :
							size === "S" ?
								" scale-100 text-orange-400 " : ""
					)}>
					尺寸
				</b>

				<p className='py-2 text-right'>
					{
						sizes.map(el => (
							<button
								className=' w-4 h-4 inline-flex justify-center items-center rounded-full ring-1 mr-2 active:bg-gray-300 hover:bg-gray-200'
								key={el}
								onClick={() => setSize(el)}>{el}</button>
						))
					}
				</p>
				<p className='py-2 flex justify-start items-end'>
					<b>現在是</b>
					<b>{size === "M" ? "中" : size === "L" ? "大" : "小"}</b>
				</p>

				<div className=' border p-4 bg-gray-100'>
					<Child1 {...{ sizes, setSize }}></Child1>
					<Child2 {...{ sizes, setSize }}></Child2>
					<Child3 {...{ size, sizes, setSize }}></Child3>
					<Child4 {...{ size, sizes, setSize }}></Child4>
					<Child5 {...{ size, sizes, setSize }}></Child5>
				</div>
			</div>
		</div>
	)
}
