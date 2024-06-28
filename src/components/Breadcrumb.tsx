import Link from "next/link";

const crumbs = [
	{ href: "", label: "琅琅悅讀" },
	{ href: "", label: "琅琅原創" },
	{ href: "", label: "進行中的活動" },
];

export default function Breadcrumb() {
	return (
		<nav>
			{crumbs.map(({ href, label }, i) => (
				<span key={i} className="text-sm">
					<Link
						href={href}
						className="hover:text-accent-300 active:text-accent-250"
					>
						{label}
					</Link>
					{i < crumbs.length - 1 && " / "}
				</span>
			))}
		</nav>
	);
}
