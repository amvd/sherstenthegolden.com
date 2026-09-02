<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import port1 from '$lib/assets/portfolio/portfolio-1.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import port2 from '$lib/assets/portfolio/portfolio-2.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import port3 from '$lib/assets/portfolio/portfolio-3.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';
	import port4 from '$lib/assets/portfolio/portfolio-4.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture';

	const items = [
		{ picture: port1, alt: 'Portfolio Item 1 - Aurelia', title: 'Aurelia, Blade of Dawn' },
		{ picture: port2, alt: 'Portfolio Item 2 - Solaria', title: 'High Priestess Solaria' },
		{ picture: port3, alt: 'Portfolio Item 3 - Elowen', title: 'Elowen of the Gilded Canopy' },
		{ picture: port4, alt: 'Portfolio Item 4 - Vespera', title: 'Vespera the Astral Sorceress' }
	];
</script>

<svelte:head>
	<title>Portfolio | Shersten the Golden</title>
	<meta
		name="description"
		content="A showcase of cosplay creations, prop crafting, and high-fantasy character photography by Shersten the Golden."
	/>
	<link rel="canonical" href="https://sherstenthegolden.com/portfolio" />
	<meta property="og:url" content="https://sherstenthegolden.com/portfolio" />
	<meta property="og:title" content="Portfolio | Shersten the Golden" />
	<meta
		property="og:description"
		content="A showcase of cosplay creations, prop crafting, and high-fantasy character photography."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<div>
		<Navbar isHome={false} />

		<main id="main-content" class="mx-auto max-w-6xl px-6 py-12">
			<!-- Header -->
			<div class="mb-12 text-center md:text-left">
				<h1 class="font-serif text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl">
					Portfolio
				</h1>
				<p class="mt-3 max-w-xl text-base text-text-body">
					A showcase of cosplay creations, prop crafting, and high-fantasy photography.
				</p>
			</div>

			<!-- Portfolio Grid -->
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
				{#each items as item}
					<div
						class="group overflow-hidden rounded-xl border border-border-main/60 bg-bg-card/40 transition-all hover:border-border-accent"
					>
						<div class="relative overflow-hidden">
							<picture class="block w-full">
								{#each Object.entries(item.picture.sources) as [format, srcset]}
									<source {srcset} type={'image/' + format} />
								{/each}
								<img
									src={item.picture.img.src}
									width={item.picture.img.w}
									height={item.picture.img.h}
									alt={item.alt}
									class="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
									decoding="async"
								/>
							</picture>
						</div>
						<div class="p-5">
							<h3 class="font-serif text-xl font-semibold text-text-main">
								{item.title}
							</h3>
						</div>
					</div>
				{/each}
			</div>
		</main>
	</div>

	<Footer />
</div>
