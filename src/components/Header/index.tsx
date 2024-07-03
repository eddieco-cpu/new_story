"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import "@styles/header.scss";

const Header: React.FC = () => {
	//
	// const router = useRouter();
	// const params = useSearchParams();
	// const pathname = usePathname();

	const targetRef = useRef(null);
	const [fixHeader, setFixHeader] = useState(false);
	const [isSearchBox, setIsSearchBox] = useState(false);

	useEffect(() => {
		// console.log(router);
		// console.log(params);
		// console.log(pathname);

		const target = targetRef.current;

		const observer = new IntersectionObserver(
			(entries, observer) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
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
				threshold: 0.5,
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

	return (
		<>
			<header className={`header ${fixHeader ? "mini-header" : ""}`}>
				<div className="container">
					{/* top */}
					<div className="header-wrapper">
						<div className="hamburger">
							<Image
								src="/images/humburger.svg"
								alt="Hamburger Menu"
								width={24}
								height={24}
							/>
						</div>

						<h1 className="logo">
							<a href="https://udn.com/news/index" className="logo-udn">
								<Image
									src="/images/reading-logo.svg"
									alt="聯合新聞網"
									width={100}
									height={24}
								/>
							</a>
							<a href="https://reading.udn.com/read/index" className="logo-txt">
								<Image
									src="/images/reading-brand.svg"
									alt="琅琅悅讀"
									width={100}
									height={24}
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
									<div className="search-select__toggle">找作品</div>
									<ul className="search-select__list">
										<li>
											{/* onClick={() => searchType('1', 'b')} data-value="1" */}
											<a>找作品</a>
										</li>
										<li>
											{/* onClick={() => searchType('1', 'a')} data-value="2" */}
											<a>找作者</a>
										</li>
									</ul>
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
								<a>
									<Image
										src="/images/search.svg"
										alt="搜尋"
										width={24}
										height={24}
									/>
								</a>
							</span>
							<span className="tools-box__item">
								<a href="../shelf/shelf_buy.do">
									<svg width="24" height="22" viewBox="0 0 24 22" fill="none">
										<path
											d="M1 6.30831V16.6018M1 8.88169H7.60851M2.65213 16.6018H5.95638M2.10142 2.44824H6.50709C7.11539 2.44824 7.60851 3.02431 7.60851 3.73493V19.1752C7.60851 19.8858 7.11539 20.4619 6.50709 20.4619H2.10142C1.49312 20.4619 1 19.8858 1 19.1752V3.73493C1 3.02431 1.49312 2.44824 2.10142 2.44824Z"
											stroke="#7E7E7E"
											strokeWidth="1.5"
										/>
										<path
											d="M7.6084 6.30831V16.6018M7.6084 8.88169H13.2728M9.02451 16.6018H11.8567M8.55247 2.44824H12.3288C12.8502 2.44824 13.2728 3.02431 13.2728 3.73493V19.1752C13.2728 19.8858 12.8502 20.4619 12.3288 20.4619H8.55247C8.03107 20.4619 7.6084 19.8858 7.6084 19.1752V3.73493C7.6084 3.02431 8.03107 2.44824 8.55247 2.44824Z"
											stroke="#7E7E7E"
											strokeWidth="1.5"
										/>
										<path
											d="M14.4913 6.50605L16.6661 16.6837M15.035 9.05046L20.5532 7.86126M18.0457 16.3864L20.8047 15.7918M14.5955 2.49125L18.2743 1.69846C18.7822 1.589 19.3157 2.06984 19.4658 2.77246L22.728 18.0389C22.8781 18.7415 22.5881 19.3998 22.0801 19.5093L18.4014 20.3021C17.8934 20.4115 17.3599 19.9307 17.2098 19.2281L13.9476 3.96165C13.7975 3.25904 14.0875 2.60072 14.5955 2.49125Z"
											stroke="#7E7E7E"
											strokeWidth="1.5"
										/>
									</svg>
								</a>
							</span>
							<span className="tools-box__item">
								<a href="https://ssl1.udn.com/ecapp/DPCart.do">
									<svg width="22" height="21" viewBox="0 0 22 21" fill="none">
										<path
											d="M1.66699 0.666992L2.46699 3.33366M2.46699 3.33366L5.66699 14.0003H20.3337V6.00033C20.3337 4.52757 19.1398 3.33366 17.667 3.33366H2.46699ZM17.667 19.3337C16.9306 19.3337 16.3337 18.7367 16.3337 18.0003C16.3337 17.2639 16.9306 16.667 17.667 16.667C18.4034 16.667 19.0003 17.2639 19.0003 18.0003C19.0003 18.7367 18.4034 19.3337 17.667 19.3337ZM7.00033 18.0003C7.00033 17.2639 7.59728 16.667 8.33366 16.667C9.07004 16.667 9.66699 17.2639 9.66699 18.0003C9.66699 18.7367 9.07004 19.3337 8.33366 19.3337C7.59728 19.3337 7.00033 18.7367 7.00033 18.0003Z"
											stroke="#777777"
											strokeWidth="1.7"
										/>
									</svg>
								</a>
								<span className="cart-num" id="cart-num_span">
									0
								</span>
							</span>
							<span className="tools-box__item">
								{/* href="javascript:window.location.href='../center/login.do?redirect='+encodeURIComponent(window.location.href)" */}
								<a>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<g clipPath="url(#clipUser)">
											<path
												d="M10.0003 2.45247C10.5769 2.45247 11.1407 2.62348 11.6202 2.94387C12.0997 3.26426 12.4734 3.71964 12.6941 4.25243C12.9148 4.78522 12.9725 5.37149 12.86 5.9371C12.7475 6.50271 12.4698 7.02225 12.062 7.43003C11.6543 7.83781 11.1347 8.11552 10.5691 8.22802C10.0035 8.34053 9.41723 8.28279 8.88443 8.0621C8.35164 7.84141 7.89626 7.46768 7.57587 6.98818C7.25548 6.50868 7.08447 5.94495 7.08447 5.36826C7.08586 4.59537 7.39351 3.85453 7.94002 3.30802C8.48654 2.7615 9.22737 2.45386 10.0003 2.45247V2.45247ZM10.0003 0.515625C9.03738 0.515625 8.09612 0.801153 7.29551 1.3361C6.4949 1.87105 5.8709 2.63139 5.50242 3.52098C5.13395 4.41057 5.03753 5.38945 5.22538 6.33383C5.41323 7.27821 5.8769 8.14568 6.55777 8.82654C7.23863 9.5074 8.1061 9.97107 9.05048 10.1589C9.99486 10.3468 10.9737 10.2504 11.8633 9.88188C12.7529 9.5134 13.5133 8.8894 14.0482 8.0888C14.5832 7.28819 14.8687 6.34693 14.8687 5.38405C14.8687 4.09286 14.3558 2.85456 13.4428 1.94155C12.5297 1.02855 11.2914 0.515625 10.0003 0.515625V0.515625Z"
												fill="#7E7E7E"
											/>
											<path
												d="M10 14.4947C14.5526 14.4947 17.5579 16.221 17.8947 17.5526H2.10526C2.45789 16.221 5.46316 14.4947 10 14.4947ZM10 12.5684C4.47895 12.5684 0 14.9315 0 17.8315C0.00102421 18.0912 0.0364193 18.3496 0.105263 18.5999C0.181426 18.8513 0.336927 19.0712 0.548497 19.2268C0.760067 19.3824 1.01633 19.4653 1.27895 19.4631H18.7211C18.9837 19.4653 19.2399 19.3824 19.4515 19.2268C19.6631 19.0712 19.8186 18.8513 19.8947 18.5999C19.9636 18.3496 19.999 18.0912 20 17.8315C20 14.9157 15.5211 12.5684 10 12.5684V12.5684Z"
												fill="#7E7E7E"
											/>
										</g>
										<defs>
											<clipPath id="clipUser">
												<rect
													width="20"
													height="18.9789"
													fill="white"
													transform="translate(0 0.5)"
												/>
											</clipPath>
										</defs>
									</svg>
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
			<div ref={targetRef} className={`header-ref`}></div>
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
