<script lang="ts">
	import { page } from '$app/state';

	let { isHome = false }: { isHome?: boolean } = $props();

	// Tracks whether the navbar is currently stuck at the top of the viewport
	let isSnapped = $state(false);
	// For user manually expanding/collapsing the mobile drawer
	let isMobileMenuOpen = $state(false);

	let navElement: HTMLElement | null = $state(null);
	let initialNavTop = $state(0);

	const currentPath = $derived(page.url.pathname);

	// Measure initial position and track scroll for desktop snapping on home page
	$effect(() => {
		if (!isHome || typeof window === 'undefined') return;

		let ticking = false;

		const updateInitialTop = () => {
			if (navElement) {
				const rect = navElement.getBoundingClientRect();
				initialNavTop = rect.top + window.scrollY;
			}
		};

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (navElement) {
						const snapped = window.scrollY >= (initialNavTop > 0 ? initialNavTop - 2 : 500);
						if (snapped !== isSnapped) {
							isSnapped = snapped;
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

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMenu() {
		isMobileMenuOpen = false;
	}
</script>

<nav
	bind:this={navElement}
	aria-label="Main Navigation"
	class="sticky top-0 z-40 w-full border-b border-border-main/60 bg-bg-main/90 backdrop-blur-md will-change-transform"
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
				onclick={closeMenu}
				aria-label="Shersten the Golden - Return to home"
				class="font-serif text-lg font-bold tracking-wider text-text-main transition-colors hover:text-white {currentPath === '/links'
					? 'hidden md:block'
					: 'block'}"
			>
				Shersten the Golden
			</a>
		{/if}

		<!-- Desktop Links (Always visible on desktop md:flex) -->
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

		<!-- Mobile Button: Visible on mobile across all pages -->
		<button
			type="button"
			onclick={toggleMenu}
			aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
			aria-expanded={isMobileMenuOpen}
			class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-text-main focus:outline-none hover:text-white md:hidden"
		>
			{#if isMobileMenuOpen}
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
	</div>

	<!-- Mobile Links Menu Drawer with smooth max-height & opacity transition -->
	<div
		class="overflow-hidden border-border-main/50 bg-bg-main/95 transition-[max-height,opacity] duration-300 ease-in-out md:hidden {isHome
			? 'text-center'
			: 'text-left'} {isMobileMenuOpen
			? 'max-h-80 border-t opacity-100'
			: 'max-h-0 border-t-0 opacity-0 pointer-events-none'}"
	>
		<div class="flex flex-col gap-2 px-6 py-4">
			{#if !isHome}
				<a
					href="/"
					onclick={closeMenu}
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
				onclick={closeMenu}
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
				onclick={closeMenu}
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
				onclick={closeMenu}
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
