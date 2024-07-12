"use client";
import { useState, useContext, createContext, ReactNode } from "react";

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
}

//
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: ReactNode }) => {
	//
	const [count, setCount] = useState<number>(5);
	const [isMoblieShowFilterCate, setIsMoblieShowFilterCate] = useState(false);
	const [
		isMoblieShowFilterDetailsCondition,
		setIsMoblieShowFilterDetailsCondition,
	] = useState(false);

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
