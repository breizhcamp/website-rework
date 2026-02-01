<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	const fullURL = `${PUBLIC_BASE_URL}${$page.url.pathname}`;

	export let title: string;
	export let description: string;
	export let image = '/cover.png';
	export let author = 'Equipe du BreizhCamp';
	export let date: string | undefined = undefined;
	export let type: 'website' | 'article' = 'website';
	export let robots = true;
</script>

<svelte:head>
	{#if !robots}
		<meta name="robots" content="noindex" />
	{/if}

	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="alternate" href={fullURL} hreflang="fr-FR" />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={fullURL} />
	<meta property="og:image" content="{PUBLIC_BASE_URL}{image}" />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="fr_FR" />

	<!-- Twitter -->
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:url" content={fullURL} />
	<meta property="twitter:image" content="{PUBLIC_BASE_URL}{image}" />
	<meta property="twitter:card" content="summary_large_image" />

	{#if type === 'article'}
		<meta name="author" content={author} />
		<meta property="article:published_time" content={date} />
	{/if}
</svelte:head>
