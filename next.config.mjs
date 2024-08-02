/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, //close useEffect called twice
	async rewrites() {
		return [
			{
				source: "/story3/:path*",
				destination: "https://story-onlinelab.udn.com/story3/:path*",
			},
		];
	},
};

export default nextConfig;
