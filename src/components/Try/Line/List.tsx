import Item from "./Item";

import { Cards } from "./index";

type Props = {
  cards: Cards;
};

export default function List(props: Props) {
  //
  const { cards } = props;

  return (
    <ul className="flex flex-wrap content-start items-start justify-start gap-2 p-2 ring-1">
      {cards.map((card, index) => (
        <Item key={index} {...{ card }} />
      ))}
    </ul>
  );
}
