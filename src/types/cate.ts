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

//
export type CateData = {
	id: string;
	num_title: string;
	weight: string;
	level: string;
	name: string;
};

export type FetchedCateData = {
	message: string;
	status: string;
	list: CateData[];
};
