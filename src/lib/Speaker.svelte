<script lang="ts">
	import type { Speaker } from '../routes/programme/constants';

	interface Props {
		speaker: string | Speaker;
		size: 'lg' | 'md' | 'sm';
		reducedTextSize?: boolean;
	}

	const { speaker, size, reducedTextSize = false }: Props = $props();
</script>

<div class="size-{size}" class:reduced-text-size={reducedTextSize}>
	<span class="avatar">
		{#if typeof speaker === 'string'}
			<!-- FIXME this is ridiculous -->
			<img src="/user.svg" alt="" width="30" />
			<p>{speaker}</p>
		{:else}
			{#if speaker.imageProfilURL}
				<img src={speaker.imageProfilURL} class="picture" alt="" width="30" />
			{:else}
				<img src="/user.svg" alt="" width="30" />
			{/if}
			<p>{speaker.firstname} {speaker.lastname}</p>
		{/if}
	</span>
	{#if size === 'lg' && typeof speaker !== 'string'}
		<p class="bio">{speaker.bio.replace(/\n\n/g, '\n')}</p>
	{/if}
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.avatar img {
		border-radius: 20px;
		flex-shrink: 0;
		width: 30px;
		aspect-ratio: 1;
	}

	.avatar img.picture {
		border: 3px solid hsl(var(--accent-color));
	}

	.avatar p {
		margin: 0;
		font-size: 14px;
		line-height: 1.05;
		color: #333333;

		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.reduced-text-size .avatar p {
		font-size: 12px;
	}

	.size-sm img {
		width: 20px;
	}

	.size-sm .avatar img.picture {
		border: 1px solid hsl(var(--accent-color));
	}

	.size-sm p {
		font-size: 12px;
	}

	.size-sm.reduced-text-size p {
		font-size: 10px;
	}

	.size-lg .avatar {
		gap: 12px;
	}

	.size-lg + :global(.size-lg) {
		margin-top: 24px;
	}

	.size-lg img {
		width: 36px;
	}

	.size-lg .avatar p {
		font-size: 16px;
	}

	.bio {
		display: block;
		font-size: 14px;
		white-space: pre-line;
		margin: 4px 0 16px;
		line-height: 1;
	}
</style>
