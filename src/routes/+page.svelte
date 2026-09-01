<script lang="ts">
	import profileImg from '$lib/assets/images/main.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture';
	import home1 from '$lib/assets/images/home/home-1.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home2 from '$lib/assets/images/home/home-2.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home3 from '$lib/assets/images/home/home-3.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home4 from '$lib/assets/images/home/home-4.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';

	const socials = [
		{ name: 'Instagram', url: 'https://instagram.com' },
		{ name: 'TikTok', url: 'https://tiktok.com' },
		{ name: 'YouTube', url: 'https://youtube.com' },
		{ name: 'Patreon', url: 'https://patreon.com' },
		{ name: 'Email', url: 'mailto:contact@sherstenthegolden.com' }
	];

	const showcases = [
		{
			picture: home1,
			alt: 'Shersten the Golden Cosplay - Aurelia',
			title: 'Aurelia, Blade of Dawn',
			subtitle: 'Armor Craft & Prop Design',
			description:
				'Hand-sculpted ornate filigree armor and radiant sun runes, tailored for high-fantasy storytelling.'
		},
		{
			picture: home2,
			alt: 'Shersten the Golden Cosplay - Solaria',
			title: 'High Priestess Solaria',
			subtitle: 'Fabric & Gold Embroidery',
			description:
				'Flowing ceremonial silk vestments and radiant temple adornments inspired by ancient celestial order.'
		},
		{
			picture: home3,
			alt: 'Shersten the Golden Cosplay - Elowen',
			title: 'Elowen of the Gilded Canopy',
			subtitle: 'Leathercraft & Archery',
			description:
				'Wet-formed vegetable-tanned leaf armor and gilded recurve bow crafted for deep forest sentinels.'
		},
		{
			picture: home4,
			alt: 'Shersten the Golden Cosplay - Vespera',
			title: 'Vespera the Astral Sorceress',
			subtitle: 'Costume & Star Runes',
			description:
				'Midnight velvet cloak embroidered with celestial constellations and glowing armillary magic spheres.'
		}
	];

	let scrollY = $state(0);
	let innerHeight = $state(800);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head>
	<title>Shersten the Golden</title>
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

	<main class="flex w-full flex-col items-center pt-4">
		<!-- Bio Section -->
		<div class="w-full max-w-4xl px-6 text-center">
			<p class="mx-auto max-w-xl text-base leading-relaxed text-text-body sm:text-lg">
				Fantasy cosplayer, prop maker, and themed model bringing legendary characters to life.
			</p>
		</div>

		<!-- Divider -->
		<div class="w-full max-w-4xl px-6 flex justify-center">
			<hr class="my-12 w-full max-w-xl border-border-main" />
		</div>

		<!-- Alternating Showcases with Seamless Full Edge-to-Edge Fading & Parallax -->
		<section class="w-full flex flex-col gap-20 md:gap-36 overflow-hidden">
			{#each showcases as item, i}
				{@const isEven = i % 2 === 0}
				<!-- Expected scroll position for this section to calculate relative parallax offset -->
				{@const baseOffset = 600 + i * 800}
				{@const parallaxY = (scrollY - baseOffset) * 0.08}

				<div class="relative w-full flex flex-col md:flex-row items-center {isEven ? 'md:flex-row' : 'md:flex-row-reverse'}">
					<!-- Full-Height Image Container with Smooth Multi-Stop Gradient Fades -->
					<div class="relative w-full md:w-3/5 overflow-hidden">
						<picture class="block w-full">
							{#each Object.entries(item.picture.sources) as [format, srcset]}
								<source {srcset} type={'image/' + format} />
							{/each}
							<img
								src={item.picture.img.src}
								width={item.picture.img.w}
								height={item.picture.img.h}
								alt={item.alt}
								class="w-full h-auto object-contain will-change-transform scale-105"
								style:transform="translateY({parallaxY}px)"
								loading="lazy"
								decoding="async"
							/>
						</picture>

						<!-- Mobile: Smooth Vignette Gradient (Top, Bottom & Sides) -->
						<div
							class="absolute inset-0 md:hidden pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_var(--color-bg-main)_95%)]"
						></div>
						<div
							class="absolute inset-0 md:hidden pointer-events-none bg-gradient-to-t from-bg-main via-transparent to-bg-main"
						></div>

						<!-- Desktop: Deep Directional Gradient Mask from image edge into page background -->
						{#if isEven}
							<div
								class="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-bg-main/30 to-bg-main"
							></div>
							<!-- Left edge gentle blend -->
							<div
								class="hidden md:block absolute inset-y-0 left-0 w-24 pointer-events-none bg-gradient-to-r from-bg-main to-transparent"
							></div>
						{:else}
							<div
								class="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-bg-main/30 to-bg-main"
							></div>
							<!-- Right edge gentle blend -->
							<div
								class="hidden md:block absolute inset-y-0 right-0 w-24 pointer-events-none bg-gradient-to-l from-bg-main to-transparent"
							></div>
						{/if}

						<!-- Deep Top & Bottom Smooth Gradient Blends -->
						<div class="absolute inset-x-0 top-0 h-32 md:h-44 pointer-events-none bg-gradient-to-b from-bg-main via-bg-main/60 to-transparent"></div>
						<div class="absolute inset-x-0 bottom-0 h-32 md:h-44 pointer-events-none bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent"></div>
					</div>

					<!-- Opposing Text Content Area -->
					<div class="relative z-10 w-full md:w-2/5 px-6 py-8 md:py-12 flex {isEven ? 'md:justify-start' : 'md:justify-end'}">
						<div
							class="w-full max-w-md bg-bg-main/85 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none border md:border-none border-border-main/60 shadow-lg md:shadow-none space-y-3 {isEven ? 'text-left' : 'text-left md:text-right'}"
						>
							<span
								class="inline-block text-xs uppercase tracking-widest text-text-muted font-serif"
							>
								{item.subtitle}
							</span>
							<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-wide text-text-main">
								{item.title}
							</h2>
							<p class="text-sm sm:text-base text-text-body leading-relaxed">
								{item.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</section>
	</main>

	<!-- Footer -->
	<footer class="mt-24 border-t border-border-main px-6 pt-8 pb-12 text-center">
		<div class="flex flex-wrap justify-center gap-6 text-sm text-text-footer">
			{#each socials as social}
				<a
					href={social.url}
					target="_blank"
					rel="noreferrer"
					class="transition-colors hover:text-text-main"
				>
					{social.name}
				</a>
			{/each}
		</div>
		<p class="mt-6 text-xs text-text-muted">
			© {new Date().getFullYear()} Shersten the Golden, built with love by
			<a href="https://armand.io" target="_blank" class="underline">armand.io</a>.
		</p>
	</footer>
</div>
