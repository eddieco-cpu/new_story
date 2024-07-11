import { useState, useEffect } from "react";

type Mode = "default" | "yellow" | "blue" | "green" | "dark";

function setPieceModeStyle(PieceMode: Mode) {
	document.documentElement.style.setProperty(
		"--piece-nav",
		`var(--${PieceMode}-nav)`
	);
	document.documentElement.style.setProperty(
		"--piece-border",
		`var(--${PieceMode}-border)`
	);
	document.documentElement.style.setProperty(
		"--piece-body",
		`var(--${PieceMode}-body)`
	);
	document.documentElement.style.setProperty(
		"--piece-aside",
		`var(--${PieceMode}-aside)`
	);
	document.documentElement.style.setProperty(
		"--piece-content",
		`var(--${PieceMode}-content)`
	);
	document.documentElement.style.setProperty(
		"--piece-text",
		`var(--${PieceMode}-text)`
	);
}

const useMode = () => {
	const [mode, setMode] = useState<Mode>("default");

	useEffect(() => {
		// 檢查 window 是否定義，以確保在瀏覽器環境中執行
		if (typeof window !== "undefined") {
			const savedMode = localStorage.getItem("piece-mode") as Mode;
			if (savedMode) {
				setPieceModeStyle(savedMode);
				setMode(savedMode);
			}
		}
	}, []);

	const toggleMode = (newMode: Mode) => {
		//
		setMode(newMode);
		setPieceModeStyle(newMode);
		localStorage.setItem("piece-mode", newMode);
	};

	return [mode, toggleMode] as const;
};

export default useMode;
