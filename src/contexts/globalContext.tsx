"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useContext, createContext, ReactNode } from "react";

//
interface GlobalContextType {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	isMemberConformAgreementOfRead: boolean;
	setIsMemberConformAgreementOfRead: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	directToLogin: (redirectURI?: string) => void;
}

//
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	//
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//
	const [count, setCount] = useState(5);
	const [isMemberConformAgreementOfRead, setIsMemberConformAgreementOfRead] =
		useState<boolean>(false);

	function directToLogin(redirectURI?: string) {
		//
		const afterLoginUrl =
			redirectURI || window.location.origin + pathname + searchParams;

		router.push(
			`https://reading.udn.com/store/center/login.do?redirect=${afterLoginUrl}`
		);
	}

	//
	return (
		<>
			<GlobalContext.Provider
				value={{
					count,
					setCount,
					directToLogin,
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
