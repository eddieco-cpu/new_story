"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";

import Image from "next/image";
import Link from "next/link";

import { getData } from "@/lib/api";

import { CateData, FetchedCateData } from "@/types/cate";

import SearchForm from "./SearchForm";
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

import "@styles/header.scss";

const Header: React.FC = () => {
	//
	const targetRef = useRef(null);
	const [fixHeader, setFixHeader] = useState(false);
	const [isSearchBox, setIsSearchBox] = useState(false);
	const [isDrawer, setIsDrawer] = useState(false);
	const [categoryDatas, setCategoryDatas] = useState<CateData[]>([]);

	useEffect(() => {
		//
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

						{/* -- */}
						<Suspense fallback={<div>Loading...</div>}>
							<SearchForm {...{ isSearchBox, setIsSearchBox }} />
						</Suspense>

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
								<Link href={"https://reading.udn.com/store/center/profile.do"}>
									<Suspense fallback={<div>Loading...</div>}>
										<Avatar />
									</Suspense>
								</Link>
							</span>
						</div>
					</div>

					{/* nav */}
					<nav className="navigation">
						<div className="navigation-wrapper navigation-wrapper--left">
							<span className="navigation-item">
								<Link href="" style={{ fontWeight: 500 }}>
									推薦
								</Link>
							</span>
							<span className="navigation-item">
								<Link href="/main-site/">全站分類</Link>
							</span>
							<span className="navigation-item">
								<Link href="/ranking/">排行榜</Link>
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

export default Header;
