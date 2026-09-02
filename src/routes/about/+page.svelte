<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import aboutImg from '$lib/assets/about/about-main.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
</script>

<svelte:head>
	<title>About | Shersten the Golden</title>
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<div>
		<Navbar isHome={false} />

		<main class="mx-auto max-w-6xl px-6 py-12">
			<!-- About Container: On mobile text at top fading to image at bottom; on desktop image left fading to bio on right -->
			<div
				class="relative overflow-hidden rounded-2xl border border-border-main/50 bg-bg-card/20 shadow-xl flex flex-col md:flex-row items-center"
			>
				<!-- Mobile: Bio Text at Top | Desktop: Bio Text on Right -->
				<!-- Note: On desktop flex-row-reverse puts bio on right, image on left -->
				<div
					class="order-1 flex w-full flex-col justify-center px-6 py-8 md:order-2 md:w-1/2 md:p-12"
				>
					<span
						class="inline-block font-serif text-xs tracking-widest text-text-muted uppercase"
					>
						Cosplayer & Artisan
					</span>
					<h1 class="mt-2 font-serif text-3xl font-bold tracking-wide sm:text-4xl">
						About Shersten
					</h1>
					<div class="mt-6 space-y-4 text-base leading-relaxed text-text-body">
						<p>
							Shersten the Golden is a fantasy cosplayer, prop artisan, and model dedicated to bringing complex, legendary lore to life through detailed craftsmanship.
						</p>
						<p>
							Specializing in hand-sculpted armor, ornate filigree detail, wet-formed leathercrafting, and custom textile work, every build blends high-fantasy aesthetics with immersive storytelling.
						</p>
						<p>
							Based in the Pacific Northwest, Shersten collaborates with photographers, videographers, and creators across the fantasy community to create stunning visual narratives.
						</p>
					</div>
				</div>

				<!-- Mobile: Image at Bottom | Desktop: Image on Left -->
				<div class="relative order-2 w-full overflow-hidden md:order-1 md:w-1/2">
					<picture class="block w-full">
						{#each Object.entries(aboutImg.sources) as [format, srcset]}
							<source {srcset} type={'image/' + format} />
						{/each}
						<img
							src={aboutImg.img.src}
							width={aboutImg.img.w}
							height={aboutImg.img.h}
							alt="Shersten the Golden - About"
							class="h-auto w-full object-cover"
							loading="eager"
							decoding="async"
						/>
					</picture>

					<!-- Mobile Fade: Top gradient fade into text above -->
					<div
						class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-main via-bg-main/60 to-transparent md:hidden"
					></div>

					<!-- Desktop Fade: Left-to-right gradient fade from image to bio on the right -->
					<div
						class="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-bg-main/40 to-bg-main md:block"
					></div>
				</div>
			</div>
		</main>
	</div>

	<Footer />
</div>
