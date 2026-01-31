<script lang="ts">
	import type { Session } from './constants';
	import Event from './Event.svelte';
	import MobileSlotTime from './MobileSlotTime.svelte';
	import { groupSessionsBySlots } from './utils';

	interface Props {
		sessions: Array<Session>;
		eventTypes: Array<string>;
		currentDayOfWeek: number;
	}

	const { sessions, eventTypes, currentDayOfWeek }: Props = $props();

	const data = $derived(groupSessionsBySlots(sessions, currentDayOfWeek));
</script>

{#each data as slot (slot.startAt)}
	<MobileSlotTime {...slot} />
	{#each slot.sessions as session (session.id)}
		<Event {...session} {eventTypes} />
	{/each}
{/each}
