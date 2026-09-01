/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

declare module '*&as=picture' {
	const picture: {
		sources: Record<string, string>;
		img: {
			src: string;
			w: number;
			h: number;
		};
	};
	export default picture;
}

declare module '*&picture' {
	const picture: {
		sources: Record<string, string>;
		img: {
			src: string;
			w: number;
			h: number;
		};
	};
	export default picture;
}

declare module '*?as=picture' {
	const picture: {
		sources: Record<string, string>;
		img: {
			src: string;
			w: number;
			h: number;
		};
	};
	export default picture;
}

declare module '*as=picture' {
	const picture: {
		sources: Record<string, string>;
		img: {
			src: string;
			w: number;
			h: number;
		};
	};
	export default picture;
}

declare module '*.jpg?*' {
	const src: string;
	export default src;
}

declare module '*.png?*' {
	const src: string;
	export default src;
}
