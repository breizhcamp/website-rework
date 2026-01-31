<script lang="ts">
	import DayNavigation from '../DayNavigation.svelte';
	import Filters from '../Filters.svelte';
	import LaptopSchedule from '../LaptopSchedule.svelte';
	import MobileSchedule from '../MobileSchedule.svelte';
	import '../themes.css';
	import { filterSessions } from '../utils';

	const { data } = $props();

	let filter = $state({
		search: '',
		eventTypes: []
	});

	function getDayOfWeek() {
		return data.day ? parseInt(data.day) : data.eventDays[0]!.getDay();
	}

	let currentDayOfWeek = $derived(getDayOfWeek());

	const filteredSessions = $derived(
		filterSessions(data.schedule, { ...filter, dayOfWeek: currentDayOfWeek })
	);
</script>

<h1>Programme</h1>

<DayNavigation days={data.eventDays} {currentDayOfWeek} />
<Filters eventTypes={data.eventTypes} bind:filter />

<div class="mobile-only">
	<MobileSchedule sessions={filteredSessions} eventTypes={data.eventTypes} {currentDayOfWeek} />
</div>
<div class="laptop-only">
	<LaptopSchedule
		sessions={filteredSessions}
		rooms={data.eventRooms}
		eventTypes={data.eventTypes}
		{currentDayOfWeek}
	/>
</div>

<style>
	h1 {
		font-size: 36px;
		text-transform: uppercase;
	}

	.laptop-only {
		display: none;
	}
	@media (min-width: 1024px) {
		.mobile-only {
			display: none;
		}
		.laptop-only {
			display: block;
		}
	}
</style>
