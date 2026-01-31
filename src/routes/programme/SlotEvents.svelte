<script lang="ts">
	import type { Session } from './constants';
	import Event from './Event.svelte';

	interface Props {
		sessions: Array<Session>;
		eventTypes: Array<string>;
	}

	const { sessions, eventTypes }: Props = $props();
</script>

{#each sessions as session (session.id)}
	<Event {...session} {eventTypes} />
{/each}
