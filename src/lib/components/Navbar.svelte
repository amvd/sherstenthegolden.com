<script lang="ts">
	import { page } from '$app/state';

	let { isHome = false }: { isHome?: boolean } = $props();

	let mobileMenuOpen = $state(false);

	const currentPath = $derived(page.url.pathname);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav
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
					class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath === '/'
						? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
						: 'text-text-muted hover:text-text-main'}"
				>
					Home
				</a>
			{/if}
			<a
				href="/portfolio"
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
				class="font-serif text-sm uppercase tracking-widest transition-colors {currentPath.startsWith(
					'/about'
				)
					? 'border-b border-text-main pb-0.5 font-semibold text-text-main'
					: 'text-text-muted hover:text-text-main'}"
			>
				About
			</a>
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			type="button"
			onclick={toggleMenu}
			aria-label="Toggle Navigation Menu"
			aria-expanded={mobileMenuOpen}
			class="p-1.5 text-text-main focus:outline-none hover:text-white md:hidden"
		>
			{#if mobileMenuOpen}
				<!-- Close Icon -->
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			{:else}
				<!-- Hamburger Icon -->
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

	<!-- Mobile Dropdown Menu -->
	{#if mobileMenuOpen}
		<div
			class="animate-fade-in border-t border-border-main/50 bg-bg-main/95 px-6 py-4 md:hidden {isHome
				? 'text-center'
				: 'text-left'}"
		>
			<div class="flex flex-col gap-4">
				{#if !isHome}
					<a
						href="/"
						onclick={closeMenu}
						class="font-serif text-sm uppercase tracking-widest {currentPath === '/'
							? 'font-semibold text-text-main'
							: 'text-text-muted'}"
					>
						Home
					</a>
				{/if}
				<a
					href="/portfolio"
					onclick={closeMenu}
					class="font-serif text-sm uppercase tracking-widest {currentPath.startsWith('/portfolio')
						? 'font-semibold text-text-main'
						: 'text-text-muted'}"
				>
					Portfolio
				</a>
				<a
					href="/about"
					onclick={closeMenu}
					class="font-serif text-sm uppercase tracking-widest {currentPath.startsWith('/about')
						? 'font-semibold text-text-main'
						: 'text-text-muted'}"
				>
					About
				</a>
			</div>
		</div>
	{/if}
</nav>
