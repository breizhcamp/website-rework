<script>
	import Seo from '$lib/components/seo/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { title, excerpt, date, cover, author } = $$props;
</script>

<Seo
	title="{title} | BreizhCamp"
	description={excerpt}
	{date}
	image={cover}
	{author}
	type="article"
/>

<article>
	<p class="date">
		publié le {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date(date))}
	</p>

	<h1>{title}</h1>

	<slot />

	<p>— {author}</p>

	<div>
		<Button href="/blog">Retourner à la liste des articles</Button>
	</div>
</article>

<style>
	.date {
		text-align: right;
		margin-top: 0px;
		color: var(--neutral-700);
		font-style: italic;
		font-size: 14px;
	}

	h1 {
		font-size: 36px;
	}

	div {
		display: flex;
		justify-content: center;
		margin: 128px 0 64px 0;
	}

	article :global(img) {
		width: 100%;
		margin: 64px 0;
	}

	article :global(img[src$='#small']) {
		max-width: 400px;
		margin: 64px auto;
	}

	article :global(hr) {
		max-width: 256px;
		margin: 128px auto;
		border: none;
		border-top: 4px solid var(--neutral-300);
	}

	article :global(h2) {
		margin-top: 64px;
	}

	@media (min-width: 768px) {
		article {
			max-width: 1024px;
			margin: auto;
		}
	}
</style>
