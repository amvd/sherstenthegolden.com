<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-bg-card focus:px-4 focus:py-2 focus:font-serif focus:text-sm focus:text-text-highlight focus:shadow-lg focus:outline-none"
>
	Skip to main content
</a>

{@render children()}
