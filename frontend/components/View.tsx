import type { ReactNode } from 'react';

import { Pane } from 'evergreen-ui';

// View is an extremely simple component to make sure that the layout is consistent
export function View({ children }: { children: ReactNode }) {
	return (
		<Pane
			display='flex'
			justifyContent='center'
			alignItems='center'
			marginX='8px'
			paddingBottom='24px'
			paddingTop='64px'
		>
			<Pane
				borderRadius={8}
				textAlign='left'
				elevation={1}
				background='white'
				marginX='18px'
				maxWidth='600px'
				width='100%'
				paddingX='32px'
				paddingTop='8px'
				paddingBottom='24px'
			>
				{children}
			</Pane>
		</Pane>
	);
}

export default View;
