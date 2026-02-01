<script lang="ts">
	import type { Post } from '$lib/types/blog';

	const { author, banner, date, excerpt, slug, title }: Post = $props();
</script>

<a href={slug}>
	<img src={banner} alt="" height="175" width="300" loading="lazy" />
	<div>
		<p class="date">
			publié le {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(
				new Date(date)
			)}
		</p>
		<h2>
			{title}
		</h2>
		<p>{excerpt}</p>
		<p class="author">
			— {author}
		</p>
	</div>
</a>

<style>
	a {
		display: block;
		text-decoration: none;
		overflow: hidden;
		border: 1px solid var(--neutral-300);
		border-radius: 8px;
	}

	img {
		width: 100%;
		height: 240px;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	div {
		padding: 8px 16px 16px 16px;
	}
	h2 {
		font-size: 24px;
		margin: 24px 0 0 0;
	}
	p {
		margin: 8px 0px;
	}
	.date {
		margin-top: 0px;
		color: var(--neutral-700);
		font-style: italic;
		font-size: 14px;
	}
	.author {
		margin-bottom: 0px;
		color: var(--neutral-700);
		font-style: italic;
		font-size: 14px;
	}
</style>
