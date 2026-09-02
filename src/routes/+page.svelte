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
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<!-- Full-width Hero Banner with Parallax -->
	<header class="relative h-[70vh] w-full overflow-hidden sm:h-[80vh]">
		<!-- Parallax Image Layer -->
		<picture class="absolute inset-0 h-full w-full">
			{#each Object.entries(profileImg.sources) as [format, srcset]}
				<source {srcset} type={'image/' + format} />
			{/each}
			<img
				src={profileImg.img.src}
				width={profileImg.img.w}
				height={profileImg.img.h}
				alt="Shersten the Golden"
				class="h-[120%] w-full object-cover object-center will-change-transform"
				style:transform="translateY({scrollY * 0.35}px)"
				loading="eager"
				decoding="async"
			/>
		</picture>

		<!-- Gradient Vignette / Overlay to blend into page background and ensure high text readability -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-bg-main"></div>

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

		<!-- Static Mobile In-Page Links (Rendered in normal document flow on mobile so there are zero sticky layout shifts) -->
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

		<!-- Sticky Navbar (Positioned in normal flow on desktop, sticks on scroll with smooth sticky hamburger on mobile) -->
		<Navbar isHome={true} />

		<!-- Alternating Showcases with Seamless Full Edge-to-Edge Fading & Parallax -->
		<section class="flex w-full flex-col gap-20 overflow-hidden pt-4 md:gap-36">
			{#each showcases as item, i}
				{@const isEven = i % 2 === 0}
				<!-- Expected scroll position for this section to calculate relative parallax offset -->
				{@const baseOffset = 600 + i * 800}
				{@const parallaxY = (scrollY - baseOffset) * 0.08}

				<div
					class="relative flex w-full flex-col items-center md:flex-row {isEven
						? 'md:flex-row'
						: 'md:flex-row-reverse'}"
				>
					<!-- Full-Height Image Container with Smooth Multi-Stop Gradient Fades -->
					<div class="relative w-full overflow-hidden md:w-3/5">
						<picture class="block w-full">
							{#each Object.entries(item.picture.sources) as [format, srcset]}
								<source {srcset} type={'image/' + format} />
							{/each}
							<img
								src={item.picture.img.src}
								width={item.picture.img.w}
								height={item.picture.img.h}
								alt={item.alt}
								class="h-auto w-full scale-105 object-contain will-change-transform"
								style:transform="translateY({parallaxY}px)"
								loading="lazy"
								decoding="async"
							/>
						</picture>

						<!-- Mobile: Smooth Vignette Gradient (Top, Bottom & Sides) -->
						<div
							class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_var(--color-bg-main)_95%)] md:hidden"
						></div>
						<div
							class="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-bg-main md:hidden"
						></div>

						<!-- Desktop: Deep Directional Gradient Mask from image edge into page background -->
						{#if isEven}
							<div
								class="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-bg-main/30 to-bg-main md:block"
							></div>
							<!-- Left edge gentle blend -->
							<div
								class="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-bg-main to-transparent md:block"
							></div>
						{:else}
							<div
								class="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-transparent via-bg-main/30 to-bg-main md:block"
							></div>
							<!-- Right edge gentle blend -->
							<div
								class="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-bg-main to-transparent md:block"
							></div>
						{/if}

						<!-- Deep Top & Bottom Smooth Gradient Blends -->
						<div
							class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-main via-bg-main/60 to-transparent md:h-44"
						></div>
						<div
							class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent md:h-44"
						></div>
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
