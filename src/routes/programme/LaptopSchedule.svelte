<script lang="ts">
	import type { Session } from './constants';
	import SlotEvents from './SlotEvents.svelte';
	import SlotTitle from './SlotTitle.svelte';
	import { groupSessionsBySlotsAndRooms, sortEventsDate, type DaySessionsBySlot } from './utils';

	interface Props {
		sessions: Array<Session>;
		rooms: Array<string>;
		eventTypes: Array<string>;
		currentDayOfWeek: number;
	}

	const { sessions, rooms, eventTypes, currentDayOfWeek }: Props = $props();

	const data = $derived(groupSessionsBySlotsAndRooms(sessions, rooms, currentDayOfWeek));

	const roomsWithoutHall = $derived(rooms.filter((room) => room !== 'Hall'));
</script>

{#snippet snippet_time_cell(row: DaySessionsBySlot)}
	<td>
		<SlotTitle {...row} />
	</td>
{/snippet}

{#snippet snippet_columns(rooms: Array<string>, row: DaySessionsBySlot)}
	{#each rooms as room (room)}
		{@const value = row.sessions[room] ?? []}
		<td>
			<SlotEvents sessions={value} {eventTypes} />
		</td>
	{/each}
{/snippet}

<table role="grid">
	<thead>
		<tr>
			<th style:width="200px">Horaire</th>
			{#each roomsWithoutHall as room (room)}
				<th scope="col">{room}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row (row.startAt)}
			<tr>
				{#if row.sessions['Hall']?.length && row.sessions['Amphi D']?.length}
					<!-- si Hall et Amphi D => Hall sur A et B + Amphi C, D et E (jeudi et vendredi midi) -->
					{@render snippet_time_cell(row)}

					<td colspan="2">
						<SlotEvents sessions={row.sessions['Hall']} {eventTypes} />
					</td>
					{@render snippet_columns(
						roomsWithoutHall.slice(Math.max(roomsWithoutHall.length - 3, 0)),
						row
					)}
				{:else if row.sessions['Hall']?.length}
					<!-- si Hall sans Amphi D => affichage Hall + Amphi C sur 5 colonnes (jeudi et vendredi matin) -->
					{@render snippet_time_cell(row)}

					<td colspan="5">
						<SlotEvents
							sessions={[
								...row.sessions['Hall'],
								...('Amphi C' in row.sessions ? row.sessions['Amphi C'] : [])
							].sort(sortEventsDate)}
							{eventTypes}
						/>
					</td>
				{:else if !row.sessions['Amphi A']?.length && row.sessions['Amphi C']?.length}
					<!-- si Amphi C sans Amphi A => affichage Amphi C sur 5 colonnes (keynote soir) -->
					{@render snippet_time_cell(row)}

					<td colspan="5">
						<SlotEvents sessions={row.sessions['Amphi C']} {eventTypes} />
					</td>
				{:else}
					<!-- sinon, affichage de toutes les colonnes -->
					{@render snippet_time_cell(row)}
					{@render snippet_columns(rooms, row)}
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		max-width: 100%;
	}

	thead th {
		padding: 12px 0;
	}

	td {
		border-bottom: 1px solid #e5e7eb;
		vertical-align: top;
	}

	td:first-child {
		width: 144px;
		min-width: 144px;
		max-width: 144px;
		padding: 16px 8px;
	}

	td + td {
		width: 18.5%;
	}
</style>
