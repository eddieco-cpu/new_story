import Item from "./Item";

import { Cards } from "./index";

type Props = {
	cards: Cards
}

export default function List(props: Props) {
  //
	const { cards } = props;

  return (
    <ul className=" flex justify-start content-start items-start flex-wrap gap-2 ring-1 p-2">
      {
				cards.map((card, index) => (
					<Item key={index} {...{card}} />
				))
			}
    </ul>
  )
}
