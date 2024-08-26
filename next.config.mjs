/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig = {
	reactStrictMode: false, //close useEffect called twice
	basePath,
	async rewrites() {
		return [
			{
				source: "/story3/:path*",
				destination: "https://story-onlinelab.udn.com/story3/:path*",
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: `${basePath}`,
				basePath: false,
				permanent: true,
			},
		];
	},
};

export default nextConfig;
