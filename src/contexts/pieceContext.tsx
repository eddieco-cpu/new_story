"use client";
import {
	useState,
	useContext,
	createContext,
	useEffect,
	ReactNode,
} from "react";

//
type LineHeightType = "S" | "M" | "L";

//
interface PieceContextType {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;

	isSettingBox: boolean;
	setIsSettingBox: React.Dispatch<React.SetStateAction<boolean>>;

	fontSize: number;
	setFontSize: React.Dispatch<React.SetStateAction<number>>;

	lineHeight: LineHeightType;
	setLineHeight: React.Dispatch<React.SetStateAction<LineHeightType>>;
}

//
const PieceContext = createContext<PieceContextType | undefined>(undefined);

const PieceProvider = ({ children }: { children: ReactNode }) => {
	//
	const [count, setCount] = useState(5);
	const [isSettingBox, setIsSettingBox] = useState(false);
	const [fontSize, setFontSize] = useState(20);
	const [lineHeight, setLineHeight] = useState<LineHeightType>("S");

	return (
		<>
			<PieceContext.Provider
				value={{
					count,
					setCount,
					isSettingBox,
					setIsSettingBox,

					//
					fontSize,
					setFontSize,
					lineHeight,
					setLineHeight,
				}}
			>
				{children}
			</PieceContext.Provider>
		</>
	);
};

// 自定義 Hook 用於方便地使用 Context
// 將 context 的判斷，在這邊做掉
const usePieceContext = () => {
	const context = useContext(PieceContext);
	if (!context) {
		throw new Error("usePieceContext must be used within a PieceProvider");
	}
	return context;
};

//
export default PieceProvider;
export { PieceContext, usePieceContext };
