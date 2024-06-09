export interface IconProps {
	props: {
		viewBox: string;
		xmlns: string;
		children: PathElement | PathElement[];
	};
}

export interface PathElement {
	props: PathElementProps;
}

export interface PathElementProps {
	d: string;
	clipRule: 'inherit' | 'nonzero' | 'evenodd' | undefined;
	fillRule: 'inherit' | 'nonzero' | 'evenodd' | undefined;
}
