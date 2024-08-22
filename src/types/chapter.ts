import { FetchedResponseType } from "./index";

export type Chapter = {
	point: string;
	title: string;
	order: string;
	publishtime: string;
	chapter_id: string;
	isfree: string;
	ver: string;
	right: string;
};
export type ProductChaptersData = {
	list: Chapter[];
} & FetchedResponseType;
