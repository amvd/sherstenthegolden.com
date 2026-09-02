<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import aboutImg from '$lib/assets/about/about-main.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
</script>

<svelte:head>
	<title>About | Shersten the Golden</title>
	<meta
		name="description"
		content="Learn about Shersten the Golden — Colorado-based fantasy cosplayer, artisan prop maker, and themed model."
	/>
	<link rel="canonical" href="https://sherstenthegolden.com/about" />
	<meta property="og:url" content="https://sherstenthegolden.com/about" />
	<meta property="og:title" content="About | Shersten the Golden" />
	<meta
		property="og:description"
		content="Learn about Shersten the Golden — Colorado-based fantasy cosplayer, artisan prop maker, and themed model."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<div>
		<Navbar isHome={false} />

		<main id="main-content" class="mx-auto max-w-6xl px-6 py-12">
			<!-- About Container: On mobile text at top fading to image at bottom; on desktop image left fading to bio on right -->
			<div
				class="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border-main/50 bg-bg-card/20 shadow-xl md:flex-row"
			>
				<!-- Mobile: Bio Text at Top | Desktop: Bio Text on Right -->
				<!-- Note: On desktop flex-row-reverse puts bio on right, image on left -->
				<div
					class="order-1 flex w-full flex-col justify-center px-6 py-8 md:order-2 md:w-1/2 md:p-12"
				>
					<span class="inline-block font-serif text-xs tracking-widest text-text-muted uppercase">
						Cosplayer & Artisan
					</span>
					<h1 class="mt-2 font-serif text-3xl font-bold tracking-wide sm:text-4xl">
						About Shersten
					</h1>
					<div class="mt-6 space-y-4 text-base leading-relaxed text-text-body">
						<p>Shersten is honestly just really hot and you should hire her to be hot for you.</p>
						<p>
							She's also very talented and can make really cool things and she has a lot of swords
							that she could poke you with but chooses not to because she is also kind and gentle.
						</p>
						<p>
							Based in Colorado, Shersten is honestly just the best human being out there. She's
							better than you, she's better than me, and also she does hair.
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
