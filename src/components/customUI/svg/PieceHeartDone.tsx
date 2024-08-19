import React from "react";

export default function PieceHeartDone({ className }: { className?: string }) {
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
				d="M21.4993 11.5001C22.5601 10.4393 23.2001 9.55717 23.2001 8.05688C23.2001 4.93268 20.6674 2.40002 17.5432 2.40002C16.0429 2.40002 14.6041 2.99601 13.5432 4.05688L12 5.60002L10.4569 4.05688C9.39604 2.99601 7.95719 2.40002 6.4569 2.40002C3.33271 2.40002 0.800049 4.93268 0.800049 8.05688C0.800049 9.55717 1.39604 10.996 2.4569 12.0569L12 21.6L14.3858 19.2142"
				stroke="#222222"
				strokeLinejoin="round"
			/>
			<path
				d="M23 15C23 16.0312 22.7135 17.0052 22.1979 17.8302C21.2469 19.4229 19.5052 20.5 17.5 20.5C15.4948 20.5 13.7417 19.4229 12.8021 17.8302C12.2979 17.0052 12 16.0312 12 15C12 11.9635 14.4635 9.5 17.5 9.5C20.5365 9.5 23 11.9635 23 15Z"
				stroke="#222222"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.3569 15.0001L16.709 16.3522L19.6423 13.6481"
				stroke="#222222"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
