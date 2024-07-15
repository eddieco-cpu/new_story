import { redirect } from "next/navigation";
import { categoryDatas } from "@lib/data";

export default function Page() {
	const firstCate = categoryDatas[0];
	redirect(firstCate.url);
	return null;
}
