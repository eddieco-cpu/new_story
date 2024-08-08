"use client";

import { useSearchParams } from "next/navigation";

import {
	useState,
	useContext,
	useCallback,
	createContext,
	ReactNode,
} from "react";

import { SortOptionType } from "@/types/search";

//
interface SearchContextType {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;

	isMoblieShowFilterCate: boolean;
	setIsMoblieShowFilterCate: React.Dispatch<React.SetStateAction<boolean>>;

	isMoblieShowFilterDetailsCondition: boolean;
	setIsMoblieShowFilterDetailsCondition: React.Dispatch<
		React.SetStateAction<boolean>
	>;

	isShowSortOption: boolean;
	setIsShowSortOption: React.Dispatch<React.SetStateAction<boolean>>;

	sortOptions: SortOptionType[];
	setSortOptions: React.Dispatch<React.SetStateAction<SortOptionType[]>>;

	createQueryString: (name: string, value: string) => string;
}

//
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: ReactNode }) => {
	//
	const searchParams = useSearchParams();
	const [count, setCount] = useState<number>(5);

	//
	const [isMoblieShowFilterCate, setIsMoblieShowFilterCate] = useState(false);
	const [
		isMoblieShowFilterDetailsCondition,
		setIsMoblieShowFilterDetailsCondition,
	] = useState(false);

	//
	const [isShowSortOption, setIsShowSortOption] = useState(false);
	const [sortOptions, setSortOptions] = useState([
		{
			id: "view",
			name: "熱門瀏覽",
			isSelected: true,
		},
		{
			id: "last_update_chapter_time",
			name: "更新時間",
			isSelected: false,
		},
		{
			id: "collection",
			name: "總收藏",
			isSelected: false,
		},
		{
			id: "words",
			name: "總字數",
			isSelected: false,
		},
	]);

	//
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	return (
		<>
			<SearchContext.Provider
				value={{
					count,
					setCount,

					isMoblieShowFilterCate,
					setIsMoblieShowFilterCate,

					isMoblieShowFilterDetailsCondition,
					setIsMoblieShowFilterDetailsCondition,

					isShowSortOption,
					setIsShowSortOption,
					sortOptions,
					setSortOptions,

					createQueryString,
				}}
			>
				{children}
			</SearchContext.Provider>
		</>
	);
};

// 自定義 Hook 用於方便地使用 Context
// 將 context 的判斷，在這邊做掉
const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearchContext must be used within a SearchProvider");
	}
	return context;
};

//
export default SearchProvider;
export { SearchContext, useSearchContext };
