export type Category = {
	id: string;
	name: string;
	url: string;
	isEmphasis: boolean;
};

export type Categories = Category[];

export type SortBook = {
	id: number;
	title: string;
	author: string;
	link: string;
	picture: string;
	amount?: number;
};

//
export type IntroCard = {
	id: number;
	title: string;
	author: string;
	link: string;
	picture: string;
	content: string;
};
