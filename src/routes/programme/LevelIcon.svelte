<script lang="ts">
	interface Props {
		level: 'Introduction' | 'Standard' | 'Avancé';
	}

	const { level }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="18"
	height="18"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#if level === 'Introduction'}
		<path
			d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"
		/>
		<path d="M4.82 7.9 8 10" />
		<path d="M15.18 7.9 12 10" />
		<path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
	{:else if level === 'Standard'}
		<path d="M16 7h.01" />
		<path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
		<path d="m20 7 2 .5-2 .5" />
		<path d="M10 18v3" />
		<path d="M14 17.75V21" />
		<path d="M7 18a6 6 0 0 0 3.84-10.61" />
	{:else}
		<path d="M11.25 17.25h1.5L12 18z" />
		<path d="m15 12 2 2" />
		<path d="M18 6.5a.5.5 0 0 0-.5-.5" />
		<path
			d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83"
		/>
		<path d="M6 6.5a.495.495 0 0 1 .5-.5" />
		<path d="m9 12-2 2" />
	{/if}
</svg>

<style>
	svg {
		display: inline-block;
	}
</style>
