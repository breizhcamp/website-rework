<script lang="ts">
	import { formatDay } from './utils';

	interface Props {
		days: Array<Date>;
		currentDayOfWeek: number;
	}

	let { days, currentDayOfWeek }: Props = $props();
</script>

<nav aria-label="Selection du jour du programme">
	{#each days as day, index (day)}
		{@const formattedDay = formatDay(day)}
		<a
			href="/programme/{day.getDay()}"
			aria-current={day.getDay() === currentDayOfWeek ? 'true' : undefined}
		>
			<span class="laptop-only">Jour {index + 1} -</span>
			{formattedDay}
		</a>
	{/each}
</nav>

<style>
	nav {
		border-bottom: 1px solid #e5e7eb;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	nav a {
		display: inline-block;
		padding: 12px 0;
		font-weight: 500;
		cursor: pointer;
		text-align: center;
	}

	nav a[aria-current] {
		color: var(--violet);
		border-bottom: 3px solid var(--violet);
	}

	@media (max-width: 767px) {
		.laptop-only {
			display: none;
		}
	}

	@media (min-width: 768px) {
		nav {
			display: block;
		}

		nav a {
			padding: 12px 24px;
		}
	}
</style>
