import { FetchedResponseType } from "./index";

export type Publisher = {
	protocol: string;
	weight: string;
	name: string;
	pic: string;
	url: string;
	anchor: string;
};
export type FetchedPublishersData = {
	list: Publisher[];
} & FetchedResponseType;
