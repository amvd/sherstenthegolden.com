<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import profileImg from '$lib/assets/profile/main.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture';
	import home1 from '$lib/assets/images/home/home-1.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home2 from '$lib/assets/images/home/home-2.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home3 from '$lib/assets/images/home/home-3.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home4 from '$lib/assets/images/home/home-4.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';

	const showcases = [
		{
			picture: home1,
			alt: 'Shersten the Cutie',
			title: 'Shersten the Cutie',
			subtitle: 'Armor Craft & Prop Design',
			description: 'Hello I am really cute and pretty like a flower and also I like flowers.'
		},
		{
			picture: home2,
			alt: 'Shersten the Mermaid',
			title: 'Shersten the Mermaid',
			subtitle: 'Fabric & Gold Embroidery',
			description:
				"I also like water and the ocean and I like to stand on the beach and close my eyes and pretend I'm a mermaid (except I don't pretend because I truly am a mermaid)."
		},
		{
			picture: home3,
			alt: 'Shersten the Golden Cosplay - Elowen',
			title: 'Shersten the Pirate',
			subtitle: 'Leathercraft & Archery',
			description: 'Hello I am a pirate yarrr behave yourself or else I might poke you.'
		},
		{
			picture: home4,
			alt: 'Shersten the Rebel',
			title: 'Shersten the Rebel',
			subtitle: 'Costume & Star Runes',
			description: 'The Empire will pay for what it did to my planet. >:('
		}
	];

	let scrollY = $state(0);
	let innerHeight = $state(800);

	/**
	 * High-Performance Zero-DOM-Recalc Parallax:
	 * - Measures element geometry (offsetTop & offsetHeight) strictly on mount/resize.
	 * - During scroll: Zero getBoundingClientRect() calls; calculates progress from cached values via single RAF dispatcher.
	 * - Culls calculations completely when elements are offscreen via shared IntersectionObserver.
	 */
	type ParallaxEntry = {
		node: HTMLElement;
		frame: HTMLElement;
		top: number;
		height: number;
		isIntersecting: boolean;
		mobile: number;
		desktop: number;
		horizontal: number;
	};

	const parallaxRegistry = new Set<ParallaxEntry>();
	let sharedObserver: IntersectionObserver | null = null;
	let globalRafId: number | null = null;
	let lastScrollY = -1;

	function measureAllParallax() {
		if (typeof window === 'undefined') return;
		for (const entry of parallaxRegistry) {
			const rect = entry.frame.getBoundingClientRect();
			entry.top = rect.top + window.scrollY;
			entry.height = rect.height;
		}
		renderParallax();
	}

	function renderParallax() {
		const currentScrollY = window.scrollY;
		const vHeight = window.innerHeight;
		const isDesktop = window.innerWidth >= 768;

		for (const entry of parallaxRegistry) {
			if (!entry.isIntersecting) continue;

			const maxTravelY = isDesktop ? entry.desktop : entry.mobile;
			const maxTravelX = isDesktop ? entry.horizontal : entry.horizontal * 0.4;

			const totalDistance = vHeight + entry.height;
			// Relative distance from bottom of screen to top of element
			const travel = currentScrollY + vHeight - entry.top;
			const progress = Math.max(0, Math.min(1, travel / totalDistance));

			const translateY = progress * maxTravelY;
			const translateX = progress * maxTravelX;
			entry.node.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
		}
		globalRafId = null;
		lastScrollY = currentScrollY;
	}

	function onGlobalScroll() {
		if (globalRafId === null) {
			globalRafId = window.requestAnimationFrame(renderParallax);
		}
	}

	function getSharedObserver(): IntersectionObserver {
		if (!sharedObserver && typeof window !== 'undefined') {
			sharedObserver = new IntersectionObserver(
				(entries) => {
					for (const obsEntry of entries) {
						for (const item of parallaxRegistry) {
							if (item.frame === obsEntry.target || item.node === obsEntry.target) {
								item.isIntersecting = obsEntry.isIntersecting;
								if (item.isIntersecting) {
									onGlobalScroll();
								}
								break;
							}
						}
					}
				},
				{ rootMargin: '150px 0px 150px 0px' }
			);

			window.addEventListener('scroll', onGlobalScroll, { passive: true });
			window.addEventListener('resize', () => {
				measureAllParallax();
				onGlobalScroll();
			}, { passive: true });
		}
		return sharedObserver!;
	}

	function showcaseParallax(
		node: HTMLElement,
		options: { mobile?: number; desktop?: number; horizontal?: number } = {
			mobile: 140,
			desktop: 240,
			horizontal: 20
		}
	) {
		const frame = node.parentElement ?? node;
		const entry: ParallaxEntry = {
			node,
			frame,
			top: 0,
			height: 0,
			isIntersecting: false,
			mobile: options.mobile ?? 140,
			desktop: options.desktop ?? 240,
			horizontal: options.horizontal ?? 20
		};

		parallaxRegistry.add(entry);
		const observer = getSharedObserver();
		observer.observe(frame);

		// Initial measure
		const timer = setTimeout(() => {
			const rect = frame.getBoundingClientRect();
			entry.top = rect.top + window.scrollY;
			entry.height = rect.height;
			onGlobalScroll();
		}, 50);

		return {
			destroy() {
				clearTimeout(timer);
				parallaxRegistry.delete(entry);
				observer.unobserve(frame);
				if (parallaxRegistry.size === 0 && sharedObserver) {
					sharedObserver.disconnect();
					sharedObserver = null;
					window.removeEventListener('scroll', onGlobalScroll);
				}
			}
		};
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head>
	<title>Shersten the Golden | Fantasy Cosplayer & Model</title>
	<meta
		name="description"
		content="Fantasy cosplayer, prop maker, and themed model bringing legendary characters to life."
	/>
	<link rel="canonical" href="https://sherstenthegolden.com/" />
	<meta property="og:url" content="https://sherstenthegolden.com/" />
	<meta property="og:title" content="Shersten the Golden | Fantasy Cosplayer & Model" />
	<meta
		property="og:description"
		content="Fantasy cosplayer, prop maker, and themed model bringing legendary characters to life."
	/>
	<!-- LCP Image Preload for Instant First Paint -->
	<link
		rel="preload"
		as="image"
		href={profileImg.img.src}
		imagesrcset={profileImg.sources.avif ?? profileImg.sources.webp ?? profileImg.img.src}
		fetchpriority="high"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<!-- Full-width Hero Banner with Parallax (Using dvh for seamless mobile address bar transitions) -->
	<header class="relative h-[70dvh] w-full overflow-hidden sm:h-[80dvh]">
		<!-- Parallax Image Layer with Top Buffer and early bottom fade to prevent edge exposure on scroll -->
		<picture
			class="absolute -top-[15%] inset-x-0 h-[135%] w-full [mask-image:linear-gradient(to_bottom,_black_30%,_transparent_72%)] [-webkit-mask-image:linear-gradient(to_bottom,_black_30%,_transparent_72%)]"
		>
			{#each Object.entries(profileImg.sources) as [format, srcset]}
				<source {srcset} type={'image/' + format} />
			{/each}
			<img
				src={profileImg.img.src}
				width={profileImg.img.w}
				height={profileImg.img.h}
				alt="Shersten the Golden"
				class="h-full w-full object-cover object-center will-change-transform [backface-visibility:hidden]"
				style:transform="translateY({scrollY * 0.25}px)"
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
		</picture>

		<!-- Gradient Vignette / Overlay to blend into page background and ensure high text readability -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg-main"></div>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-bg-main from-25% via-bg-main/90 to-transparent"
		></div>

		<!-- Title Floating on Top of Image Near Bottom -->
		<div class="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-4xl px-6 pb-8 text-center sm:pb-12">
			<h1
				class="font-serif text-4xl font-bold tracking-wider drop-shadow-md sm:text-6xl md:text-7xl"
			>
				Shersten <br />the Golden
			</h1>
		</div>
	</header>

	<main id="main-content" class="flex w-full flex-col items-center pt-8">
		<!-- Bio Section / Title Blurb -->
		<div class="flex w-full max-w-4xl flex-col items-center px-6 pb-6 text-center">
			<p class="mx-auto max-w-xl text-base leading-relaxed text-text-body sm:text-lg">
				Fantasy cosplayer, overall cutie, and themed model bringing legendary characters to life.
			</p>
			<a
				href="https://instagram.com/shersten.the.golden"
				target="_blank"
				rel="noreferrer"
				aria-label="Instagram: @shersten.the.golden"
				class="group mt-4 inline-flex items-center gap-2 rounded-full border border-border-main bg-bg-card/40 px-4 py-1.5 text-xs tracking-wider text-text-highlight transition-all duration-300 hover:border-border-accent hover:bg-bg-card/80 hover:shadow-[0_0_15px_rgba(235,240,133,0.2)]"
			>
				<svg
					class="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
					/>
				</svg>
				<span class="font-fondamento text-sm tracking-wide text-text-highlight"
					>@shersten.the.golden</span
				>
			</a>
		</div>

		<!-- Static Mobile In-Page Links (Rendered in normal document flow on mobile) -->
		<div class="flex flex-col items-center gap-3 py-4 text-center md:hidden">
			<a
				href="/portfolio"
				class="font-serif text-sm uppercase tracking-widest text-text-main transition-colors hover:text-text-highlight"
			>
				Portfolio
			</a>
			<a
				href="/about"
				class="font-serif text-sm uppercase tracking-widest text-text-main transition-colors hover:text-text-highlight"
			>
				About
			</a>
			<a
				href="/links"
				class="font-serif text-sm uppercase tracking-widest text-text-main transition-colors hover:text-text-highlight"
			>
				Links
			</a>
		</div>

		<!-- Sentinel element to detect when in-page links have completely scrolled past top of viewport -->
		<div id="home-nav-sentinel" class="h-0 w-full md:hidden"></div>

		<!-- Sticky Navbar -->
		<Navbar isHome={true} />

		<!-- Alternating Showcases with Seamless Full Edge-to-Edge Fading & Parallax -->
		<section class="flex w-full flex-col gap-20 overflow-hidden pt-4 md:gap-36">
			{#each showcases as item, i}
				{@const isEven = i % 2 === 0}
				<div
					class="relative flex w-full flex-col items-center [content-visibility:auto] [contain-intrinsic-size:auto_700px] md:flex-row {isEven
						? 'md:flex-row'
						: 'md:flex-row-reverse'}"
				>
					<!-- Full-Height Image Container: Outer Frame with Bottom Boundary Fade Mask -->
					<div
						class="relative w-full overflow-hidden md:w-3/5 [mask-image:linear-gradient(to_bottom,_black_0%,_black_72%,_transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,_black_0%,_black_72%,_transparent_100%)]"
					>
						<!-- Inner Parallax Layer: Top is feathered so moving down leaves a soft top, and bottom is feathered by outer mask -->
						<div
							use:showcaseParallax={{
								mobile: 140,
								desktop: 240,
								horizontal: isEven ? 24 : -24
							}}
							class="relative top-0 w-full scale-105 will-change-transform [backface-visibility:hidden] [mask-image:linear-gradient(to_bottom,_transparent_0%,_black_14%,_black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,_transparent_0%,_black_14%,_black_100%)]"
						>
							<picture class="block w-full">
								{#each Object.entries(item.picture.sources) as [format, srcset]}
									<source {srcset} type={'image/' + format} />
								{/each}
								<img
									src={item.picture.img.src}
									width={item.picture.img.w}
									height={item.picture.img.h}
									alt={item.alt}
									class="h-auto w-full object-contain"
									loading="lazy"
									decoding="async"
								/>
							</picture>
						</div>

						<!-- Outer Fixed Top & Bottom Smooth Gradient Blends -->
						<div
							class="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg-main via-bg-main/80 to-transparent md:h-28"
						></div>
						<div
							class="pointer-events-none absolute inset-x-0 -bottom-2 h-36 bg-gradient-to-t from-bg-main from-30% via-bg-main/90 to-transparent md:h-52"
						></div>

						<!-- Desktop: Fade ONLY the side facing the opposing text -->
						{#if isEven}
							<!-- Image is on Left, Text is on Right -> Fade Right Side only toward text -->
							<div
								class="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-bg-main via-bg-main/80 to-transparent md:block"
							></div>
							<div
								class="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-bg-main/20 to-bg-main md:block"
							></div>
						{:else}
							<!-- Image is on Right, Text is on Left -> Fade Left Side only toward text -->
							<div
								class="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-bg-main via-bg-main/80 to-transparent md:block"
							></div>
							<div
								class="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-transparent via-bg-main/20 to-bg-main md:block"
							></div>
						{/if}
					</div>

					<!-- Opposing Text Content Area -->
					<div
						class="relative z-10 flex w-full px-6 py-8 md:w-2/5 md:py-12 {isEven
							? 'md:justify-start'
							: 'md:justify-end'}"
					>
						<div
							class="w-full max-w-md space-y-3 rounded-2xl border border-border-main/60 bg-bg-main/85 p-6 shadow-lg backdrop-blur-md md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none {isEven
								? 'text-left'
								: 'text-left md:text-right'}"
						>
							<span
								class="inline-block font-serif text-xs tracking-widest text-text-muted uppercase"
							>
								{item.subtitle}
							</span>
							<h2
								class="font-serif text-2xl font-bold tracking-wide text-text-main sm:text-3xl md:text-4xl"
							>
								{item.title}
							</h2>
							<p class="text-sm leading-relaxed text-text-body sm:text-base">
								{item.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</section>
	</main>

	<!-- Footer -->
	<Footer />
</div>
