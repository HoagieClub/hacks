import '@/app/globals.css';
import '@/lib/hoagie-ui/Theme/theme.css';

import { type ReactNode, type JSX } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Toaster } from '@/components/ui/sonner';
import Layout from '@/lib/hoagie-ui/Layout';
import Nav from '@/lib/hoagie-ui/Nav';
import Theme from '@/lib/hoagie-ui/Theme';

import { hoagie } from './hoagie';

export const metadata = {
	title: 'Template App by Hoagie',
	description: 'Build the next big thing.',
};

interface ContentProps {
	children: ReactNode;
}

/**
 * Content Component
 * Fetches user data (real or mock) and renders the main layout.
 *
 * @param children - The child components to render within the layout.
 * @returns JSX Element representing the content area.
 */
async function Content({ children }: ContentProps): Promise<JSX.Element> {
	const tabs = [
		{ title: 'Test 1', href: '/feature1' },
		{ title: 'React', href: '/react' },
		{ title: 'Django', href: '/django' },
	];

	return (
		<Theme palette='template'>
			<Layout>
				<Nav name='template' tabs={tabs} />
				{children}
				<Toaster />
			</Layout>
		</Theme>
	);
}

/**
 * The root layout component that wraps all pages in the application.
 *
 * @param children - The child components to render within the layout.
 * @returns JSX Element representing the root HTML structure.
 */
export function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='en' className='bg-hoagie-teal'>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(${hoagie.toString()})();`,
					}}
				/>
			</head>
			<body className='antialiased'>
				{/* Uncomment this to see components re-render. Used for debugging. */}
				{/* <script src='https://unpkg.com/react-scan/dist/auto.global.js' /> */}
				<Content>{children}</Content>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}

export default RootLayout;
