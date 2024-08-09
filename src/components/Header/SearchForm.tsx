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
	const router = useRouter();
	const searchParams = useSearchParams();

	const searchstringParam = searchParams?.get("searchstring") || "";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

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

	const [popularSearchstrings, setPopularSearchstrings] = useState([
		"總裁",
		"言情",
		"奇幻",
		"推理",
		"靈異",
	]);
	const [recentSearchstrings, setRecentSearchstrings] = useState<string[]>([]);
	const [searchstring, setSearchstring] = useState("");

	//
	useEffect(() => {
		setSearchstring(searchstringParam);
	}, []);

	useEffect(() => {
		const searchstring = searchParams?.get("searchstring") || "";
		if (!searchstring) return;

		handleStorageSearchStrings(searchstring);
	}, [searchParams]);

	//
	function searchWithSearchstring(str?: string) {
		if (str) {
			setSearchstring(str);
			router.push("/search/" + "?" + createQueryString("searchstring", str));
		} else {
			router.push(
				"/search/" + "?" + createQueryString("searchstring", searchstring)
			);
		}
		setIsSearchBox(false);
	}

	function removeRecentSearchstrings() {
		localStorage.removeItem("search-strings");
		setRecentSearchstrings([]);
		//router.push("/search/" + "?" + createQueryString("searchstring", ""));
	}

	function handleStorageSearchStrings(str?: string) {
		const storageSearchStrings = localStorage.getItem("search-strings");
		let newSearchStrings: string[] = [];

		if (storageSearchStrings) {
			const parsedSearchStrings = JSON.parse(storageSearchStrings);
			if (Array.isArray(parsedSearchStrings)) {
				newSearchStrings = [...parsedSearchStrings];
			}
		}

		newSearchStrings = [(str || searchstring) as string, ...newSearchStrings];
		const uniqueSearchStrings = Array.from(new Set<string>(newSearchStrings));
		newSearchStrings = [...uniqueSearchStrings];

		if (newSearchStrings.length) {
			setRecentSearchstrings(() => newSearchStrings);
			localStorage.setItem("search-strings", JSON.stringify(newSearchStrings));
		}
	}

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
					value={searchstring}
					onFocus={() => setIsSearchBox(true)}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => (
						setIsSearchBox(true), setSearchstring(e.target.value)
					)}
					onKeyDown={(event) =>
						event.key === "Enter" && searchWithSearchstring()
					}
				/>
				<button
					className={"search__submit"}
					onClick={() => searchWithSearchstring()}
				>
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
								<b
									className="container-title__btn"
									onClick={removeRecentSearchstrings}
								>
									清除
								</b>
							</p>
							<ul className="container-group container-group--top">
								{recentSearchstrings.length === 0 && (
									<li className="container-group__item pointer-events-none opacity-60">
										<picture className="container-group__item-icon opacity-70">
											<Image
												src="/images/search.svg"
												alt=""
												width={15}
												height={15}
											/>
										</picture>
										<span className="container-group__item-name text-ash-500">
											搜尋書名、作者、出版社、ISBN
										</span>
									</li>
								)}
								{recentSearchstrings.map((el, i) => (
									<li
										className="container-group__item"
										key={i}
										onClick={() => searchWithSearchstring(el)}
									>
										<picture className="container-group__item-icon">
											<Image
												src="/images/search.svg"
												alt=""
												width={15}
												height={15}
											/>
										</picture>
										<span className="container-group__item-name">{el}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="container-main">
							<p className="container-title container-title--main">
								<span className="container-title__des">熱門關鍵字</span>
							</p>
							<ul className="container-group container-group--main">
								{popularSearchstrings.map((el, i) => (
									<li
										className="container-group__item"
										key={i}
										onClick={() => searchWithSearchstring(el)}
									>
										{el}
									</li>
								))}
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
