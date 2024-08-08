"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from "@/components/ui/popover";

export default function SearchForm({
	isSearchBox,
	setIsSearchBox,
}: {
	isSearchBox: boolean;
	setIsSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	//
	const [searchTypes, setSearchTypes] = useState([
		{
			id: "piece",
			name: "找作品",
			isSelected: true,
		},
		{
			id: "author",
			name: "找作者",
			isSelected: false,
		},
	]);
	const [searchstring, setSearchstring] = useState("");

	//
	useEffect(() => {
		//searchstring
	}, []);

	return (
		<div className={"search " + `${isSearchBox ? "search--active" : ""}`}>
			<div className="search__form-wrapper">
				{/* --- search inputer --- */}
				<div className="search-select">
					{/* -- */}
					<div className="absolute bottom-0 left-0 right-0 top-0 rounded-s-full">
						<Popover>
							<PopoverTrigger className="flex h-full w-full items-center justify-end gap-1 px-1">
								<p className="text-sm">
									{searchTypes.find((el) => el.isSelected)?.name}
								</p>
								<i className="i-arrow5-down text-xs"></i>
							</PopoverTrigger>
							<PopoverContent
								align="end"
								className="w-[90px] bg-landscape-300 p-0"
							>
								{searchTypes.map((type, i) => (
									<div key={type.id}>
										<PopoverClose asChild>
											<p
												className="cursor-pointer py-2 text-center hover:text-accent-300"
												onClick={() =>
													setSearchTypes((arr) =>
														arr.map((el) => ({
															...el,
															isSelected: el.id === type.id,
														}))
													)
												}
											>
												{type.name}
											</p>
										</PopoverClose>
										{i < searchTypes.length - 1 && (
											<div className="h-[1px] bg-ash-300"></div>
										)}
									</div>
								))}
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<input
					type="search"
					className={
						"search__input " + `${isSearchBox ? "search__input--active" : ""}`
					}
					placeholder="搜尋書名、作者、出版社、ISBN"
					onFocus={() => setIsSearchBox(true)}
					//onInput={(e) }
				/>
				<button className={"search__submit"} onClick={() => alert("@@@")}>
					<Image src="/images/search.svg" alt="搜尋" width={24} height={24} />
				</button>

				{/* --- isSearchBox --- */}
				<section
					className={
						"search-box search-box__wrapper " +
						`${!isSearchBox ? " search-box--none" : " "}`
					}
				>
					{/* - */}
					<section className="search-box__container">
						<div className="container-top">
							<p className="container-title container-title--top">
								<span className="container-title__des">最近搜尋</span>
								<b className="container-title__btn">清除</b>
							</p>
							<ul className="container-group container-group--top">
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">總裁</span>
								</li>
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">奇幻</span>
								</li>
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">言情</span>
								</li>
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">推理</span>
								</li>
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">推理</span>
								</li>
								<li className="container-group__item">
									<picture className="container-group__item-icon">
										<Image
											src="/images/search.svg"
											alt=""
											width={15}
											height={15}
										/>
									</picture>
									<span className="container-group__item-name">推理</span>
								</li>
							</ul>
						</div>
						<div className="container-main">
							<p className="container-title container-title--main">
								<span className="container-title__des">熱門關鍵字</span>
							</p>
							<ul className="container-group container-group--main">
								<li className="container-group__item">總裁</li>
								<li className="container-group__item">言情</li>
								<li className="container-group__item">奇幻</li>
								<li className="container-group__item">推理</li>
								<li className="container-group__item">推理</li>
							</ul>
						</div>
					</section>
					{/* - */}
					<div
						className="search-box__bg"
						onClick={() => setIsSearchBox(false)}
					></div>
				</section>

				{/* --- ad box --- */}
				<section className="search-ad search-ad__wrapper">
					<p className="search-ad__title">活動專區</p>
					<div className="search-ad__box pic-base">
						<img
							src="https://uc.udn.com.tw/photo/2019/06/11/99/6418904.jpg"
							alt=""
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
