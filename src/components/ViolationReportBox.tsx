"use client"

import React from 'react'
import { UiButton } from "@/components/customUI/client";
import { UiTitle } from "@/components/customUI";

import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

function BoxLine({ name, children }: {
	name: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-start items-start gap-4">
			<p className=" w-[60px] h-6 flex-shrink-0 text-sm flex justify-center items-center text-ash-600">{name}</p>
			<div className=" flex-grow">
				{children}
			</div>
		</div>
	);
}

export default function ViolationReportBox({
	name,
	id
}: {
	name: string;
	id: string;
}) {
	return (
		<div data-id={id}>
			<UiTitle className=" *:text-center *:w-full w-full border-b p-4 pt-0 max-lg:pb-2">作品舉報</UiTitle>
			<section className=" py-4 px-[60px] max-lg:px-2 grid gap-4">
				{/*  */}
				<BoxLine name="舉報對象">
					<p className="text-base">{name}</p>
				</BoxLine>

				{/*  */}
				<BoxLine name="舉報對象">
					<ul className=" grid gap-2 max-lg:gap-1">
						<li>
							<label className=" inline-flex justify-start items-start gap-2" >
								<input type="checkbox" className="h-[26px]" />
								<p>侵權抄襲</p>
							</label>
						</li>
						<li>
							<label className=" inline-flex justify-start items-start gap-2" >
								<input type="checkbox" className="h-[26px]" />
								<p>違反平台言論規範</p>
							</label>
						</li>
						<li>
							<label className=" inline-flex justify-start items-start gap-2" >
								<input type="checkbox" className="h-[26px]" />
								<p>內文空白或亂碼</p>
							</label>
						</li>
						<li>
							<label className=" inline-flex justify-start items-start gap-2" >
								<input type="checkbox" className="h-[26px]" />
								<p>章節重複</p>
							</label>
						</li>
						<li>
							<label className=" inline-flex justify-start items-start gap-2" >
								<input type="checkbox" className="h-[26px]" />
								<p>其他</p>
							</label>
						</li>
					</ul>
				</BoxLine>

				{/*  */}
				<BoxLine name="舉報描述">
					<div className="relative">
						<textarea
							className={`block w-full resize-none rounded-lg border border-landscape-450 bg-transparent px-3 py-2 font-normal text-ash-850 transition-all duration-300 ease-linear placeholder:font-light focus:bg-white focus:outline-none active:outline-none`}
							rows={4}
							placeholder="請在此輸入您的意見"
						></textarea>
						<span className="absolute bottom-1 right-4 text-ash-650">300</span>
					</div>
				</BoxLine>

				{/*  */}
				<BoxLine name="驗 證 碼">
					<div></div>
				</BoxLine>
			</section>

			<div className="text-center">
				<UiButton variant="primary" className=" w-16"
					onClick={() => BlockPopupModal.setIsOpen(false)}
				>
					提交
				</UiButton>
			</div>
		</div>
	);
}
