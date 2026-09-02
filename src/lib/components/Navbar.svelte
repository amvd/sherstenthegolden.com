<script lang="ts">
	import { page } from '$app/state';

	let { isHome = false }: { isHome?: boolean } = $props();

	// Tracks whether the navbar is currently stuck at the top of the viewport
	let isSnapped = $state(false);
	// For user manually expanding/collapsing when snapped
	let userExpandedWhenSnapped = $state(false);

	let navElement: HTMLElement | null = $state(null);
	let initialNavTop = $state(0);

	const currentPath = $derived(page.url.pathname);

	// On home: menu is open when NOT snapped. When snapped, only open if user toggled it open.
	// On other pages: menu is closed by default unless user toggles it open.
	const isMenuOpen = $derived(
		isHome ? (!isSnapped ? true : userExpandedWhenSnapped) : userExpandedWhenSnapped
	);

	// Measure initial position and track scroll
	$effect(() => {
		if (!isHome || typeof window === 'undefined') return;

		const updateInitialTop = () => {
			if (navElement) {
				const rect = navElement.getBoundingClientRect();
				initialNavTop = rect.top + window.scrollY;
			}
		};

		const handleScroll = () => {
			if (!navElement) return;
			// When scroll reaches or passes initial nav position, it is snapped at top
			const snapped = window.scrollY >= (initialNavTop > 0 ? initialNavTop - 2 : 500);

			if (snapped !== isSnapped) {
				isSnapped = snapped;
				if (!snapped) {
					// Reset manual toggle when returning back to top
					userExpandedWhenSnapped = false;
				} else {
					// Collapsed by default upon snapping
					userExpandedWhenSnapped = false;
				}
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
		userExpandedWhenSnapped = !userExpandedWhenSnapped;
	}

	function closeMenu() {
		userExpandedWhenSnapped = false;
	}
</script>

<nav
	bind:this={navElement}
	aria-label="Main Navigation"
	class="sticky top-0 z-40 w-full border-b border-border-main/60 bg-bg-main/90 backdrop-blur-md transition-all duration-200"
>
	<div
		class="mx-auto flex max-w-6xl items-center px-6 py-3.5 {isHome
			? 'justify-center'
			: 'justify-between'}"
	>
		<!-- Brand Logo/Name (Shown only on subpages) -->
		{#if !isHome}
			<a
				href="/"
				onclick={closeMenu}
				aria-label="Shersten the Golden - Return to home"
				class="font-serif text-lg font-bold tracking-wider text-text-main transition-colors hover:text-white"
			>
				Shersten the Golden
			</a>
		{/if}

		<!-- Desktop Links -->
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
		</div>

		<!-- Mobile Button: On home, only shown when snapped to the top; on other pages always shown on mobile -->
		{#if !isHome || isSnapped}
			<button
				type="button"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={isMenuOpen}
				class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-text-main focus:outline-none hover:text-white md:hidden animate-fade-in"
			>
				{#if isMenuOpen}
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

	<!-- Mobile Links Menu Drawer -->
	{#if isMenuOpen}
		<div
			class="animate-fade-in border-t border-border-main/50 bg-bg-main/95 px-6 py-4 md:hidden {isHome
				? 'text-center'
				: 'text-left'}"
		>
			<div class="flex flex-col gap-2">
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
					class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath.startsWith('/portfolio')
						? 'font-semibold text-text-main'
						: 'text-text-muted'}"
				>
					Portfolio
				</a>
				<a
					href="/about"
					onclick={closeMenu}
					aria-current={currentPath.startsWith('/about') ? 'page' : undefined}
					class="inline-block py-2 font-serif text-sm uppercase tracking-widest {currentPath.startsWith('/about')
						? 'font-semibold text-text-main'
						: 'text-text-muted'}"
				>
					About
				</a>
			</div>
		</div>
	{/if}
</nav>
