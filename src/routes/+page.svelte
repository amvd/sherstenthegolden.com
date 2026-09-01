<script lang="ts">
	import profileImg from '$lib/assets/images/main.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture';
	import home1 from '$lib/assets/images/home/home-1.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home2 from '$lib/assets/images/home/home-2.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home3 from '$lib/assets/images/home/home-3.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import home4 from '$lib/assets/images/home/home-4.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';

	const socials = [
		{ name: 'Instagram', url: 'https://instagram.com/shersten.the.golden' },
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
		<div class="flex w-full max-w-4xl justify-center px-6">
			<hr class="my-12 w-full max-w-xl border-border-main" />
		</div>

		<!-- Alternating Showcases with Seamless Full Edge-to-Edge Fading & Parallax -->
		<section class="flex w-full flex-col gap-20 overflow-hidden md:gap-36">
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
