"use client"

import React, { useState, useEffect } from 'react'
import Child from './Child'

var css = 'flex justify-start items-center gap-2 py-2'

export default function Index() {
	//
	const [now, setNow] = useState<Date | null>(null)	//重點 -> Date type

	useEffect(() => {
		setNow(new Date())
	}, [])

	//
	const [msg, setMsg] = useState('')

	function setDailog(m: string): void {
		alert("This is a dialog: \n" + m)
	}

	return (
		<div className='max-w-96 my-3 mx-auto'>
			<div className=' p-2 border rounded relative'>
				<p>{now?.toISOString()}</p>
				<p>
					<b>彈窗內容： </b>
					<b>{msg}</b>
				</p>
				<p className={css}>
					{/**
					 * onChange --- 自動推導 yes OK 
					 * [e] (parameter) e: React.ChangeEvent<HTMLInputElement>
					 * [e.target] (property) ChangeEvent<HTMLInputElement>.target: EventTarget & HTMLInputElement 
					 * 
					 * 寫不寫都行
					 * onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(...)}
					*/}
					<input
						type="text"
						className='px-2'
						value={msg}
						onChange={e => setMsg(e.target.value)}
						placeholder='onchange'
					/>
				</p>
				<p className={css}>
					{/**
					 * onInput --- 自動推導 not OK 
					 * [e] (parameter) e: React.FormEvent<HTMLInputElement>
					 * [e.target] (property) BaseSyntheticEvent<Event, EventTarget & HTMLInputElement, EventTarget>.target: EventTarget
					 * 
					 * 在 React 中，onInput 事件的类型是 React.FormEvent，
					 * 而 onChange 事件的类型是 React.ChangeEvent。
					 * React.FormEvent 类型的 target 属性没有明确的 value 属性，
					 * 因此会导致类型错误。
					 * 
					 * 
					*/}
					<input
						type="text"
						className='px-2'
						value={msg}
						onInput={(e) => setMsg((e.target as HTMLInputElement).value)}
						placeholder='oninput'
					/>

					<button
						className=' w-6 h-6 inline-flex justify-center items-center rounded-full ring-1 mr-2 active:bg-gray-300 hover:bg-gray-200'
						onClick={() => setDailog(msg)}
					>按</button>
				</p>

				<div className=' border p-4 bg-gray-100 mt-2'>
					<Child {...{ msg, setMsg, setDailog }} ></Child>
				</div>
			</div>
		</div>
	)
}
