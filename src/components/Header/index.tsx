"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { getData } from "@/lib/api";

import { CateData, FetchedCateData } from "@/types/cate";

import Drawer from "./Drawer";
import ToTop from "./ToTop";

import {
	Avatar,
	Cross,
	Hamburger,
	Magnifier,
	Pen,
	Shelf,
} from "@components/customUI/svg";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from "@/components/ui/popover";

import "@styles/header.scss";

const Header: React.FC = () => {
	//
	// const router = useRouter();
	// const params = useSearchParams();
	// const pathname = usePathname();

	const targetRef = useRef(null);
	const [fixHeader, setFixHeader] = useState(false);
	const [isSearchBox, setIsSearchBox] = useState(false);
	const [isDrawer, setIsDrawer] = useState(false);
	const [categoryDatas, setCategoryDatas] = useState<CateData[]>([]);

	useEffect(() => {
		// console.log(router);
		// console.log(params);
		// console.log(pathname);

		const target = targetRef.current;

		const observer = new IntersectionObserver(
			(entries, observer) => {
				const entry = entries[0];
				//console.log(entry);

				if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					//alert("Element is in view!");
					setFixHeader(false);
				} else {
					//alert("Element is out of view!");
					setFixHeader(true);
				}
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: [0, 0.9, 1],
			}
		);

		if (target) {
			observer.observe(target);
		}

		// Cleanup observer on unmount
		return () => {
			if (target) {
				observer.unobserve(target);
			}
		};
	}, []);

	useEffect(() => {
		async function fetchedCategoryData() {
			const { data } = await getData("/story3/ShowCategory?store=Y");
			if (data && data.list) {
				setCategoryDatas(() => [...data.list]);
			}
		}
		fetchedCategoryData();
	}, []);

	return (
		<>
			<header className={`header ${fixHeader ? "mini-header" : ""}`}>
				<div className="container">
					{/* top */}
					<div className="header-wrapper">
						<div className="hamburger" onClick={() => setIsDrawer(true)}>
							<Hamburger></Hamburger>
						</div>

						<h1 className="logo">
							<a href="https://udn.com/news/index" className="logo-udn">
								<Image
									src="/images/reading-logo.svg"
									alt="聯合新聞網"
									width={43}
									height={32}
								/>
							</a>
							<a href="https://reading.udn.com/read/index" className="logo-txt">
								<Image
									src="/images/reading-brand.svg"
									alt="琅琅悅讀"
									width={132}
									height={32}
								/>
							</a>
						</h1>

						{/* onSubmit={() => validateForm('1')} */}
						<form
							className={"search " + `${isSearchBox ? "search--active" : ""}`}
						>
							<div className="search__form-wrapper">
								{/* --- search inputer --- */}
								<div className="search-select">
									{/* -- */}
									<div className="absolute bottom-0 left-0 right-0 top-0 rounded-s-full">
										<Popover>
											<PopoverTrigger className="flex h-full w-full items-center justify-end gap-1 px-1">
												<p className="text-sm">找作品</p>
												<i className="i-arrow5-down text-xs"></i>
											</PopoverTrigger>
											<PopoverContent
												align="end"
												className="w-[90px] bg-landscape-300 p-0"
											>
												<PopoverClose asChild>
													<p className="cursor-pointer py-2 text-center">
														找作品
													</p>
												</PopoverClose>
												<div className="h-[1px] bg-ash-300"></div>
												<PopoverClose asChild>
													<p className="cursor-pointer py-2 text-center">
														找作者
													</p>
												</PopoverClose>
											</PopoverContent>
										</Popover>
									</div>
								</div>
								<input
									type="search"
									className={
										"search__input " +
										`${isSearchBox ? "search__input--active" : ""}`
									}
									placeholder="搜尋書名、作者、出版社、ISBN"
									onFocus={() => setIsSearchBox(true)}
								/>
								<button className={"search__submit"}>
									<Image
										src="/images/search.svg"
										alt="搜尋"
										width={24}
										height={24}
									/>
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
													<span className="container-group__item-name">
														總裁
													</span>
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
													<span className="container-group__item-name">
														奇幻
													</span>
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
													<span className="container-group__item-name">
														言情
													</span>
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
													<span className="container-group__item-name">
														推理
													</span>
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
													<span className="container-group__item-name">
														推理
													</span>
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
													<span className="container-group__item-name">
														推理
													</span>
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
						</form>

						<div className="tools-box">
							<span
								className="tools-box__item search-btn"
								onClick={() => setIsSearchBox((v) => !v)}
							>
								{isSearchBox ? <Cross></Cross> : <Magnifier></Magnifier>}
							</span>
							<span className="tools-box__item">
								<a href="../shelf/shelf_buy.do">
									<Shelf></Shelf>
								</a>
							</span>
							<span className="tools-box__item">
								<a href="https://ssl1.udn.com/ecapp/DPCart.do">
									<Pen></Pen>
								</a>
							</span>
							<span className="tools-box__item">
								{/* href="javascript:window.location.href='../center/login.do?redirect='+encodeURIComponent(window.location.href)" */}
								<a>
									<Avatar></Avatar>
								</a>
							</span>
						</div>
					</div>

					{/* nav */}
					<nav className="navigation">
						<div className="navigation-wrapper navigation-wrapper--left">
							<span className="navigation-item">
								<Link href="/read/">推薦</Link>
							</span>
							<span className="navigation-item">
								<Link href="">全站分類</Link>
							</span>
							<span className="navigation-item">
								<Link href="">排行榜</Link>
							</span>
							<span className="navigation-item">
								<Link href="">成為創作家</Link>
							</span>
							<span className="navigation-item">
								<Link href="">徵文活動</Link>
							</span>
							<span className="navigation-item">
								<Link href="">儲值點數</Link>
							</span>
						</div>

						<div className="navigation-wrapper navigation-wrapper--right">
							<span className="navigation-item">
								<Link href="/read/">琅琅悅讀</Link>
							</span>
							<span className="navigation-item">
								<Link href="">琅琅書店</Link>
							</span>
						</div>
					</nav>
				</div>
			</header>
			<Drawer {...{ isDrawer, setIsDrawer, categoryDatas }}></Drawer>
			<div ref={targetRef} className={`header-ref`}></div>
			<ToTop
				className={
					fixHeader
						? "translate-y-0 opacity-100 delay-300"
						: "pointer-events-none translate-y-20 opacity-0 delay-0"
				}
			/>
		</>
	);
};

const validateForm = (id: string): boolean => {
	// 在這裡實現表單驗證邏輯
	return true;
};

const searchType = (formId: string, type: string) => {
	// 在這裡實現搜索類型切換邏輯
};

export default Header;
