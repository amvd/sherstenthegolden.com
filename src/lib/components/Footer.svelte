<script lang="ts">
	const socials = [
		{ name: 'Instagram', url: 'https://instagram.com/shersten.the.golden' },
		{ name: 'Email', url: 'mailto:contact@sherstenthegolden.com' }
	];
</script>

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
		<a href="https://armand.io" target="_blank" class="underline hover:text-text-main">armand.io</a>.
	</p>
</footer>
