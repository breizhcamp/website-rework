<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import '$lib/css/index.css';

	let { children } = $props();
</script>

<Header />
<main>
	{@render children?.()}
</main>
<Footer />

<style>
	main {
		max-width: 1440px;
		margin: 0 auto;
		padding: 1.5rem;
	}

	@media (min-width: 768px) {
		main {
			padding: 3rem;
		}
	}
</style>
