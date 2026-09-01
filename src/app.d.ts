// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

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

declare module '*?*as=picture' {
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

declare module '*.jpeg?*' {
	const src: string;
	export default src;
}

declare module '*.png?*' {
	const src: string;
	export default src;
}

declare module '*.webp?*' {
	const src: string;
	export default src;
}

declare module '*.avif?*' {
	const src: string;
	export default src;
}

export {};
