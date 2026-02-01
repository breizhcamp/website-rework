<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import BlogCard from './BlogCard.svelte';

	const { data } = $props();
</script>

<Seo
	title="Articles de blog | BreizhCamp"
	description="Dernières actualités du BreizhCamp et de l'association organisatrice"
/>

<h1>Articles de blog</h1>

<div class="article-list col-3">
	{#each data.posts as post (post.slug)}
		<BlogCard {...post} />
	{/each}
</div>

<p>
	Consulter les <a href="https://www.breizhcamp.org/blog">archives des articles de blog</a> sur le
	site de l'édition 2025 du BreizhCamp
</p>

<style>
	h1 {
		font-size: 36px;
	}
	.article-list {
		display: grid;
		margin: 40px 0;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 40px;
	}
	@media (min-width: 768px) {
		.article-list {
			column-gap: 1.5rem;
			row-gap: 3rem;
			margin: 80px 0;
		}
		.col-3 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.article-list {
			column-gap: 1.5rem;
			row-gap: 3rem;
		}
		.col-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
