<script lang="ts">
	import { page } from '$app/state';

	let { isHome = false }: { isHome?: boolean } = $props();

	// Tracks whether the navbar is currently stuck at the top of the viewport
	let isSnapped = $state(false);
	// For user manually expanding/collapsing the mobile drawer when snapped / on subpages
	let isMobileDrawerOpen = $state(false);

	let navElement: HTMLElement | null = $state(null);
	let initialNavTop = $state(0);

	const currentPath = $derived(page.url.pathname);

	// On home: mobile drawer is only open if user explicitly opened it while snapped
	// On subpages: mobile drawer opens/closes on user click
	const isDrawerOpen = $derived(isHome ? isSnapped && isMobileDrawerOpen : isMobileDrawerOpen);

	// Measure initial position and track scroll for homepage snapping
	$effect(() => {
		if (!isHome || typeof window === 'undefined') return;

		let ticking = false;

		const updateInitialTop = () => {
			const sentinel = document.getElementById('home-nav-sentinel');
			if (sentinel) {
				const rect = sentinel.getBoundingClientRect();
				initialNavTop = rect.top + window.scrollY;
			} else if (navElement) {
				const rect = navElement.getBoundingClientRect();
				initialNavTop = rect.top + window.scrollY;
			}
		};

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					// Snap when scrolled past the sentinel (bottom of the vertical in-page links)
					const snapped = window.scrollY >= (initialNavTop > 0 ? initialNavTop : 600);
					if (snapped !== isSnapped) {
						isSnapped = snapped;
						if (!snapped) {
							isMobileDrawerOpen = false;
						}
					}
					ticking = false;
				});
				ticking = true;
			}
		};

		// Run once after initial layout renders
		const timer = setTimeout(() => {
			updateInitialTop();
			handleScroll();
		}, 100);

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateInitialTop, { passive: true });

		return () => {
			clearTimeout(timer);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateInitialTop);
		};
	});

	function toggleDrawer() {
		isMobileDrawerOpen = !isMobileDrawerOpen;
	}

	function closeDrawer() {
		isMobileDrawerOpen = false;
	}
</script>

<nav
	bind:this={navElement}
	aria-label="Main Navigation"
	class="z-40 w-full bg-bg-main/90 backdrop-blur-md will-change-transform {isHome
		? isSnapped
			? 'fixed top-0 left-0 border-b border-border-main/60 md:sticky'
			: 'hidden border-b-0 md:sticky md:top-0 md:block md:border-b md:border-border-main/60'
		: 'sticky top-0 border-b border-border-main/60'}"
>
	<div
		class="mx-auto flex max-w-6xl items-center px-6 py-3.5 {isHome
			? 'justify-center'
			: currentPath === '/links'
				? 'justify-center md:justify-between'
				: 'justify-between'}"
	>
		<!-- Brand Logo/Name (Shown only on subpages, hidden on mobile for /links) -->
		{#if !isHome}
			<a
				href="/"
				onclick={closeDrawer}
				aria-label="Shersten the Golden - Return to home"
				class="font-serif text-lg font-bold tracking-wider text-text-main transition-colors hover:text-white {currentPath === '/links'
					? 'hidden md:block'
					: 'block'}"
			>
				Shersten the Golden
			</a>
		{/if}

		<!-- Desktop Links (Visible on desktop md:flex across all pages) -->
		<div class="hidden items-center gap-8 md:flex">
			{#if !isHome}
				<a
					href="/"
					aria-current={currentPath === '/' ? 'page' : undefined}
					class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath === '/'
						? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
						: 'text-text-muted hover:text-text-main'}"
				>
					Home
				</a>
			{/if}
			<a
				href="/portfolio"
				aria-current={currentPath.startsWith('/portfolio') ? 'page' : undefined}
				class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath.startsWith(
					'/portfolio'
				)
					? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
					: 'text-text-muted hover:text-text-main'}"
			>
				Portfolio
			</a>
			<a
				href="/about"
				aria-current={currentPath.startsWith('/about') ? 'page' : undefined}
				class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath.startsWith(
					'/about'
				)
					? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
					: 'text-text-muted hover:text-text-main'}"
			>
				About
			</a>
			<a
				href="/links"
				aria-current={currentPath.startsWith('/links') ? 'page' : undefined}
				class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath.startsWith(
					'/links'
				)
					? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
					: 'text-text-muted hover:text-text-main'}"
			>
				Links
			</a>
		</div>

		<!-- Mobile Toggle Button (Visible on subpages, and on home when sticky/snapped) -->
		{#if !isHome || isSnapped}
			<button
				type="button"
				onclick={toggleDrawer}
				aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={isDrawerOpen}
				class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-text-main focus:outline-none hover:text-white md:hidden"
			>
				{#if isDrawerOpen}
					<!-- Close 'X' Icon -->
					<svg class="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<!-- Hamburger Icon -->
					<svg class="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		{/if}
	</div>

	<!-- Mobile Links Menu Drawer with smooth height & opacity transition -->
	<div
		class="overflow-hidden border-border-main/50 bg-bg-main/95 transition-[max-height,opacity] duration-300 ease-in-out md:hidden {isHome
			? 'text-center'
			: 'text-left'} {isDrawerOpen
			? 'max-h-80 border-t opacity-100'
			: 'max-h-0 border-t-0 opacity-0 pointer-events-none'}"
	>
		<div class="flex flex-col gap-2 px-6 py-4">
			{#if !isHome}
				<a
					href="/"
					onclick={closeDrawer}
					aria-current={currentPath === '/' ? 'page' : undefined}
					class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath === '/'
						? 'font-semibold text-text-main'
						: 'text-text-muted'}"
				>
					Home
				</a>
			{/if}
			<a
				href="/portfolio"
				onclick={closeDrawer}
				aria-current={currentPath.startsWith('/portfolio') ? 'page' : undefined}
				class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath.startsWith(
					'/portfolio'
				)
					? 'font-semibold text-text-main'
					: 'text-text-muted'}"
			>
				Portfolio
			</a>
			<a
				href="/about"
				onclick={closeDrawer}
				aria-current={currentPath.startsWith('/about') ? 'page' : undefined}
				class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath.startsWith(
					'/about'
				)
					? 'font-semibold text-text-main'
					: 'text-text-muted'}"
			>
				About
			</a>
			<a
				href="/links"
				onclick={closeDrawer}
				aria-current={currentPath.startsWith('/links') ? 'page' : undefined}
				class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath.startsWith(
					'/links'
				)
					? 'font-semibold text-text-main'
					: 'text-text-muted'}"
			>
				Links
			</a>
		</div>
	</div>
</nav>
