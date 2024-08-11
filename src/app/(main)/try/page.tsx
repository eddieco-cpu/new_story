"use client"

import Image from "next/image";
import Slider from "@/components/Try/Slider";
//import Carousel from "@components/Try/Carousel";
import Group from "@components/Try/Group";
import Dialog from "@components/Try/Dialog";
import Wrapper from "./components/Wrapper";
import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

function PopupBox() {
	return (
		<div className="bg-[#ddd] p-4 rounded-lg">
			<p>PopupBox</p>
		</div>
	);
}

export default function Page() {

	function controlPopup() {
		BlockPopupModal.setChildren(<PopupBox />);
		BlockPopupModal.setIsOpen(true);
	}

	//
	return (
		<section className="flex min-h-screen flex-col items-center justify-between p-24 *:w-full">
			<div>
				<Slider></Slider>
			</div>

			{/* <div>
				<Carousel></Carousel>
			</div> */}

			<div>
				<button onClick={controlPopup}>click to show popup</button>
			</div>
			<div>
				<Group></Group>
				<Dialog></Dialog>
			</div>
			<Wrapper></Wrapper>
		</section>
	);
}
