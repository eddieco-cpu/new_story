import { Card } from "./index";

export default function Item({ card }: { card: Card }) {
	return (
		<li className="w-72 rounded-md p-1 ring-1">
			<h2>{card.title}</h2>
			<p className="truncate">{card.description}</p>
			<picture className="pic-base aspect-square">
				<img src={card.image} alt={card.title} />
			</picture>
		</li>
	);
}
