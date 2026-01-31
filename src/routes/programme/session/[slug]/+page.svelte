<script lang="ts">
	import Speaker from '$lib/Speaker.svelte';
	import { speakers } from '../../constants';
	import LevelIcon from '../../LevelIcon.svelte';
	import { formatDate, formatDayOfWeek } from '../../utils';

	const { data } = $props();
</script>

<article
	class="theme-{data.themeIndex} duration-{data.duration}"
	style:opacity={data.filter === 'visible' ? 1 : 0.15}
>
	<h1>{data.name}</h1>

	<h2>Les infos pratiques</h2>
	<ul>
		<li>
			la session a lieu en <strong>{data.venue}</strong> le
			<strong>{formatDayOfWeek(data.day_of_week)}</strong>
			de <strong>{formatDate(data.event_start)} à {formatDate(data.event_end)}</strong>
		</li>
		{#if data.level}
			<li>
				La session est prévu avec un niveau <LevelIcon level={data.level} />
				<strong>{data.level}</strong>
			</li>
		{/if}
		<li>La session aura pour thème : <strong>{data.event_type}</strong></li>
	</ul>

	<h2>Description</h2>
	<p>{data.description}</p>

	<h2>Orateur·ice{speakers.length >= 2 ? 's' : ''}</h2>
	{#if data.speakers}
		<div class="speakers" class:too-crowded={data.speakers.length >= 3}>
			{#each data.speakers as speaker (speaker)}
				<Speaker {speaker} size="lg" />
			{/each}
		</div>
	{/if}
</article>

<style>
	h1 {
		font-size: 30px; /* FIXME obsolete with theme? */
	}

	h2 {
		font-size: 24px; /* FIXME obsolete with theme? */
		margin: 24px 0 8px;
	}

	p {
		white-space: pre-line;
	}
</style>
