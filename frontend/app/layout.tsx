/**
 * @overview Root layout component for the template app. Styles apply to all children.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

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
		{ title: 'Feature 1', href: '/feature1' }
	];

	return (
		<Theme palette='template'>
			<Layout>
				<Nav name='template' tabs={tabs}  />
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
