import Image from "next/image";
import Slider from "@/components/Try/Slider";
//import Carousel from "@components/Try/Carousel";
import Group from "@components/Try/Group";
import Dialog from "@components/Try/Dialog";
import Wrapper from "./components/Wrapper";

export default function Page() {
	return (
		<section className="flex min-h-screen flex-col items-center justify-between p-24 *:w-full">
			<div>
				<Slider></Slider>
			</div>

			{/* <div>
				<Carousel></Carousel>
			</div> */}
			<div>
				<Group></Group>
				<Dialog></Dialog>
			</div>
			<Wrapper></Wrapper>
		</section>
	);
}
