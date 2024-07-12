import List from "./List";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

export type Card = {
	title: string;
	description: string;
	image: string;
};

export type Cards = Card[];

const cards = [
	{
		title: randomText(5, 10),
		description: randomText(20, 30),
		image: randomPicture(),
	},
	{
		title: randomText(5, 10),
		description: randomText(20, 30),
		image: randomPicture(),
	},
	{
		title: randomText(5, 10),
		description: randomText(20, 30),
		image: randomPicture(),
	},
];

export default function Index() {
	return (
		<div>
			<p>Line</p>
			<List {...{ cards }} />
		</div>
	);
}
