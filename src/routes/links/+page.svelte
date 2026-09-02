<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import avatarImg from '$lib/assets/profile/main.jpg?w=160;320&format=avif;webp;jpg&as=picture';

	let qrSvg = $state('');

	onMount(async () => {
		try {
			qrSvg = await QRCode.toString('https://sherstenthegolden.com/links', {
				type: 'svg',
				margin: 1,
				color: {
					dark: '#0b1a28',
					light: '#eff0e0'
				}
			});
		} catch (err) {
			console.error('Failed to generate QR code', err);
		}
	});

	const links = [
		{
			title: 'Official Website & Portfolio',
			subtitle: 'Showcases, cosplay builds & photography',
			url: '/',
			isExternal: false,
			highlight: true
		},
		{
			title: 'Instagram',
			subtitle: '@shersten.the.golden',
			url: 'https://instagram.com/shersten.the.golden',
			isExternal: true,
			highlight: false
		},
		{
			title: 'TikTok',
			subtitle: '@shersten.the.golden',
			url: 'https://www.tiktok.com/@shersten.the.golden',
			isExternal: true,
			highlight: false
		},
		{
			title: 'Portfolio Gallery',
			subtitle: 'View detailed character builds and costumes',
			url: '/portfolio',
			isExternal: false,
			highlight: false
		},
		{
			title: 'About Shersten',
			subtitle: 'Bio, artisan background & craft',
			url: '/about',
			isExternal: false,
			highlight: false
		},
		{
			title: 'Contact & Business Inquiries',
			subtitle: 'contact@sherstenthegolden.com',
			url: 'mailto:contact@sherstenthegolden.com',
			isExternal: true,
			highlight: false
		}
	];
</script>

<svelte:head>
	<title>Links | Shersten the Golden</title>
	<meta
		name="description"
		content="Find all official links, social channels, portfolio showcases, and contact info for Shersten the Golden."
	/>
	<link rel="canonical" href="https://sherstenthegolden.com/links" />
	<meta property="og:url" content="https://sherstenthegolden.com/links" />
	<meta property="og:title" content="Links | Shersten the Golden" />
	<meta
		property="og:description"
		content="Find all official links, social channels, portfolio showcases, and contact info for Shersten the Golden."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col justify-between bg-bg-main text-text-main">
	<div>
		<Navbar isHome={false} />

		<main id="main-content" class="mx-auto max-w-xl px-6 py-12">
			<!-- Profile Card Header -->
			<div class="flex flex-col items-center text-center">
				<div
					class="relative mb-3 h-20 w-20 min-h-[5rem] min-w-[5rem] max-h-20 max-w-20 shrink-0 overflow-hidden rounded-full shadow-[0_0_15px_rgba(45,90,67,0.4)]"
					style="width: 80px; height: 80px; border-radius: 9999px;"
				>
					<picture class="block h-full w-full" style="width: 100%; height: 100%;">
						{#each Object.entries(avatarImg.sources) as [format, srcset]}
							<source {srcset} type={'image/' + format} />
						{/each}
						<img
							src={avatarImg.img.src}
							alt="Shersten the Golden"
							class="h-full w-full object-cover object-center"
							style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 9999px;"
							loading="eager"
							decoding="async"
						/>
					</picture>
				</div>

				<h1 class="font-serif text-2xl font-bold tracking-wide sm:text-3xl">Shersten the Golden</h1>
				<p class="mt-1 font-fondamento text-base text-text-highlight sm:text-lg">
					@shersten.the.golden
				</p>
				<p class="mt-2 max-w-sm text-xs leading-relaxed text-text-body sm:text-sm">
					Fantasy cosplayer, prop maker, and themed model bringing legendary characters to life.
				</p>
			</div>

			<!-- Links Tree List -->
			<div class="mt-8 flex flex-col gap-4">
				{#each links as link}
					<a
						href={link.url}
						target={link.isExternal ? '_blank' : undefined}
						rel={link.isExternal ? 'noreferrer' : undefined}
						class="group relative flex flex-col items-center justify-center rounded-xl border px-4 py-3.5 text-center transition-[border-color,background-color,box-shadow] duration-200 {link.highlight
							? 'border-border-accent bg-bg-card/70 hover:border-text-highlight hover:bg-bg-card hover:shadow-[0_0_20px_rgba(245,222,51,0.2)]'
							: 'border-border-main/70 bg-bg-card/40 hover:border-border-accent hover:bg-bg-card/80 hover:shadow-[0_0_15px_rgba(45,90,67,0.3)]'}"
					>
						<span
							class="font-serif text-base font-semibold leading-snug tracking-wider transition-colors duration-200 {link.highlight
								? 'text-text-highlight group-hover:brightness-110'
								: 'text-text-main group-hover:text-text-highlight'}"
						>
							{link.title}
						</span>
						{#if link.subtitle}
							<span
								class="mt-1 text-xs leading-normal text-text-muted transition-colors duration-200 group-hover:text-text-body"
							>
								{link.subtitle}
							</span>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Desktop Only: View on Mobile Floating QR Code Widget (Bottom Right) -->
			<aside
				aria-label="View on Mobile QR Code"
				class="fixed right-8 bottom-8 z-30 hidden flex-col items-center justify-center rounded-2xl border border-border-main/80 bg-bg-main/90 p-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-border-accent hover:shadow-[0_0_25px_rgba(45,90,67,0.4)] md:flex"
			>
				<div class="flex items-center gap-1.5 text-text-highlight">
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
					<span class="font-serif text-xs font-semibold tracking-wider uppercase">
						View on Mobile
					</span>
				</div>
				<p class="mt-1 text-[11px] text-text-muted">Scan to open on phone</p>
				<div
					class="mt-2.5 flex h-28 w-28 items-center justify-center rounded-lg bg-text-main p-1.5 shadow-inner"
				>
					{#if qrSvg}
						<div class="h-full w-full [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html qrSvg}
						</div>
					{:else}
						<div class="h-full w-full animate-pulse rounded bg-black/10"></div>
					{/if}
				</div>
			</aside>
		</main>
	</div>

	<Footer />
</div>
