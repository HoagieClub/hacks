'use client';

import {
	Pane,
	majorScale,
	minorScale,
	Heading,
	ArrowRightIcon,
	ArrowLeftIcon,
	Button,
} from 'evergreen-ui';
import Link from 'next/link';

import { hoagieTemplate } from '@/lib/hoagie-ui/Theme/themes';

export function Home() {
	const theme = hoagieTemplate;

	const Profile = (
			<Pane>
				<Link href='/feature1'>
					<Button
						height={56}
						width={majorScale(35)}
						backgroundColor={theme.colors.teal100}
						marginBottom={20}
						iconBefore={ArrowRightIcon}
					>
						Call to Action
					</Button>
				</Link>
			</Pane>
		);

	return (
		<Pane
			display='flex'
			justifyContent='center'
			alignItems='center'
			marginX={majorScale(1)}
			paddingBottom={majorScale(4)}
			paddingTop={majorScale(8)}
		>
			<Pane
				borderRadius={8}
				textAlign='center'
				elevation={1}
				background='white'
				marginX={20}
				maxWidth='600px'
				width='100%'
				paddingX='10px'
				paddingTop={majorScale(5)}
				paddingBottom={majorScale(7)}
			>
				<Heading size={900} className='hoagie'>
					Hoagie Template App
					<br />
					What will <b>you</b> build?
				</Heading>
				<div>
					<Pane
						display='flex'
						flexDirection='column'
						alignItems='center'
						marginTop='30px'
					>
						{Profile}
						<Link href='https://hoagie.io'>
							<Button
								height={56}
								width={majorScale(35)}
								appearance='default'
								marginBottom={20}
								iconBefore={ArrowLeftIcon}
							>
								<Pane display='flex'>
									Back to
									<Pane marginLeft={minorScale(1)} className='hoagie'>
										hoagie<b>platform</b>
									</Pane>
								</Pane>
							</Button>
						</Link>
						<br />
					</Pane>
				</div>
				<div>© 2025 Hoagie Club.</div>
			</Pane>
		</Pane>
	);
}

export default Home;
