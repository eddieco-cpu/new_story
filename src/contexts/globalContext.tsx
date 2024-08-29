"use client";
import { useState, useContext, createContext, ReactNode } from "react";

//
interface GlobalContextType {
	isMemberConformAgreementOfRead: boolean;
	setIsMemberConformAgreementOfRead: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

//
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	//
	const [isMemberConformAgreementOfRead, setIsMemberConformAgreementOfRead] =
		useState<boolean>(false);

	//
	return (
		<>
			<GlobalContext.Provider
				value={{
					isMemberConformAgreementOfRead,
					setIsMemberConformAgreementOfRead,
				}}
			>
				{children}
			</GlobalContext.Provider>
		</>
	);
};

// 自定義 Hook 用於方便地使用 Context
// 將 context 的判斷，在這邊做掉
const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

//
export default GlobalProvider;
export { GlobalContext, useGlobalContext };
