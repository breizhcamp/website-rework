<script lang="ts">
	import Speaker from '$lib/Speaker.svelte';
	import { type Session } from './constants';
	import LevelIcon from './LevelIcon.svelte';
	import { formatDate } from './utils';

	type Props = Session & { eventTypes: Array<string> };

	const {
		id,
		name,
		speakers,
		event_type,
		level,
		event_start,
		event_end,
		filter,
		eventTypes,
		venue
	}: Props = $props();

	const duration = $derived((event_end.getTime() - event_start.getTime()) / 1000 / 60);

	const themeIndex = $derived(eventTypes.findIndex((eventType) => eventType === event_type));
</script>

<article
	class="theme-{themeIndex} duration-{duration}"
	style:opacity={filter === 'visible' ? 1 : 0.15}
>
	<!-- FIXME use correct title level -->
	<a href="/programme/session/{id}"><h2>{name}</h2></a>
	{#if speakers}
		<div class="speakers" class:too-crowded={speakers.length >= 3}>
			{#each speakers as speaker, index (index)}
				<Speaker
					{speaker}
					size={duration < 40 ? 'sm' : 'md'}
					reducedTextSize={duration < 100 && speakers.length > 1}
				/>
			{/each}
		</div>
	{/if}
	<div class="footer">
		<p class="schedule">
			{formatDate(event_start)} — {formatDate(event_end)}
			<span class="mobile-only"> · {venue}</span>
		</p>
		<div class="flex">
			{#if level}
				<span class="level" title={level} aria-label="Niveau {level}">
					<LevelIcon {level} />
				</span>
			{/if}
			<span class="event-type">{event_type}</span>
		</div>
	</div>
</article>

<style>
	article {
		background-color: hsla(var(--bg-color), 1);
		border-left: 4px solid hsla(var(--accent-color), 1);
		border-radius: 8px;
		margin: 8px 0 8px 8px;
		padding: 8px 16px;
		height: 200px;
	}

	.duration-15 {
		height: 76px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.duration-25,
	.duration-30 {
		height: 100px;
	}

	.duration-55 {
		height: 200px;
	}

	.duration-120 {
		height: 408px;
	}

	h2 {
		font-size: 16px;
		color: #1a1a1a;
		line-height: 1.2;
		margin-bottom: 12px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		transition: color 0.1s;
	}

	h2:hover {
		color: var(--orange);
	}

	.speakers {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.duration-55 .speakers.too-crowded,
	.duration-120 .speakers {
		flex-wrap: wrap;
		gap: 4px 8px;
	}

	.schedule {
		font-size: 12px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.flex {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.event-type {
		font-size: 12px;
		text-transform: uppercase;
		background-color: hsla(var(--accent-color), 0.1);
		padding: 4px 8px;
		border-radius: 12px;
	}

	.level {
		height: 26px;
		display: flex;

		background-color: hsla(var(--accent-color), 0.1);
		padding: 4px;
		border-radius: 12px;
	}

	.duration-15 {
		padding: 4px 12px;
	}

	.duration-15 h2,
	.duration-25 h2 {
		font-size: 12px;
		line-height: 1.05;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.duration-15 h2,
	.duration-15 .speakers {
		margin-bottom: 0;
	}

	.duration-25 h2,
	.duration-25 .speakers {
		margin-bottom: 8px;
	}

	.duration-15 .schedule,
	.duration-25 .schedule {
		font-size: 10px;
		margin: 0;
	}

	.duration-15 .footer,
	.duration-25 .footer {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-between;
	}

	.duration-15 .event-type,
	.duration-25 .event-type {
		font-size: 10px;
		padding: 2px 6px;
		max-width: 80px;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.duration-15 .level,
	.duration-25 .level {
		padding: 2px;
		border-radius: 10px;
		height: 18px;
	}

	.duration-15 .level :global(svg),
	.duration-25 .level :global(svg) {
		width: 14px;
		height: 14px;
	}

	@media (min-width: 768px) {
		.mobile-only {
			display: none;
		}
	}
</style>
