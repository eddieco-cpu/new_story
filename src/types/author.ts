import { FetchedResponseType } from "./index";
import { ProductCardViaAuthorType } from "./product";

export type FetchedAuthorDataType = {
	reader_avatar: string;
	agree_s_term_ver: string;
	reader_nickname: string;
	reader_description: string;
	writer_type: string;
	writer_nickname: string;
	agree_gt_term_ver: string;
	agree_w_term_ver: string;
	writer_description: string;
	is_stop: string;
	published_count: string;
	writer_avatar: string;
} & FetchedResponseType;

export type FetchedAuthorPiecesData = {
	list: ProductCardViaAuthorType[];
} & FetchedResponseType;
