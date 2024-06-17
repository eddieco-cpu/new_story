"use client"

import React from 'react'

var css = 'flex justify-start items-center gap-2 py-2'

export default function Child({ msg, setMsg, setDailog }: {
    msg: string,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setDailog: (x: string) => void
}) {
    return (
        <div>
            <p className={css}>
                <input
                    type="text"
                    className='px-2'
                    value={msg}
                    onInput={(e) => setMsg((e.target as HTMLInputElement).value)}
                />

                <button
                    className=' w-6 h-6 inline-flex justify-center items-center rounded-full ring-1 mr-2 active:bg-gray-300 hover:bg-gray-200'
                    onClick={() => setDailog(msg)}
                >按</button>
            </p>
        </div>
    )
}
