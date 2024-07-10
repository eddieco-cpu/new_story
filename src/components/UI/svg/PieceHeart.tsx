import React from "react";

export default function PieceHeart({ className }: { className?: string }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className || ""}
		>
			<path
				d="M2.45666 12.0569L11.9998 21.6L21.543 12.0569C22.6038 10.996 23.1998 9.55717 23.1998 8.05688C23.1998 4.93268 20.6671 2.40002 17.543 2.40002C16.0427 2.40002 14.6038 2.99601 13.543 4.05688L11.9998 5.60002L10.4567 4.05688C9.39579 2.99601 7.95695 2.40002 6.45666 2.40002C3.33246 2.40002 0.799805 4.93268 0.799805 8.05688C0.799805 9.55717 1.39579 10.996 2.45666 12.0569Z"
				stroke="#222222"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
