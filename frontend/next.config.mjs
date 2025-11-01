import withPWA from 'next-pwa';

const nextConfig = {
	reactStrictMode: true,
	...withPWA({
		dest: 'public',
		register: true,
		skipWaiting: true,
	}),
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
			},
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
			},
		],
	},
};

export default nextConfig;
