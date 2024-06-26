import Image from "next/image";
import Slider from "@/components/Try/Slider";
//import Carousel from "@components/Try/Carousel";
import Group from "@components/Try/Group";
import Dialog from "@components/Try/Dialog";

export default function Home() {
	return (
		<section className="flex min-h-screen flex-col items-center justify-between p-24">
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
		</section>
	);
}
