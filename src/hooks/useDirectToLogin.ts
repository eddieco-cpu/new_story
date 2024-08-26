"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useDirectToLogin = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const directToLogin = (redirectURI?: string) => {
		const afterLoginUrl =
			redirectURI || window.location.origin + pathname + searchParams;

		router.push(
			`https://reading.udn.com/store/center/login.do?redirect=${afterLoginUrl}`
		);
	};

	return [directToLogin];
};

export default useDirectToLogin;
