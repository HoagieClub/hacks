import 'evergreen-ui';

declare module 'evergreen-ui' {
	interface DefaultTheme {
		title: string;
	}
}

export type HoagieUser = {
	name?: string;
	email?: string;
};
