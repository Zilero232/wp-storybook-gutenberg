export interface Props {
	attributes: {
		bgImageDesktop: number;
		bgImageMobile: number;
		src: string;
		text: string;
	};
	setAttributes: any;
	bgImageDesktopMedia: {
		media_details: {
			width: number;
			height: number;
		};
		source_url: string;
	};
	bgImageMobileMedia: {
		media_details: {
			width: number;
			height: number;
		};
		source_url: string;
	};
}
