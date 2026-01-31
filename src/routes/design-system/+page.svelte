<script>
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	// Données
	let formData = { email: '', entreprise: '', role: 'Dev', message: '', newsletter: false };
	const brandColors = [
		{ name: 'Violet', hex: '#8E3089', bg: 'var(--violet)', text: 'white' },
		{ name: 'Jaune-vert', hex: '#E0E04E', bg: 'var(--lime)', text: 'black' },
		{ name: 'Orange', hex: '#DD7A26', bg: 'var(--orange)', text: 'white' },
		{ name: 'Noir', hex: '#000000', bg: 'var(--black)', text: 'white' }
	];
	const neutralColors = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
</script>

<svelte:head>
	<title>Design System - BreizhCamp</title>
</svelte:head>

<section class="hero">
	<h1>Design System <span class="text-gradient">BreizhCamp</span></h1>
	<p class="subtitle">Système de design complet...</p>
	<div class="tags">
		<Badge color="yellow">WCAG 2.1 AA</Badge>
		<Badge color="grey">Éco-conçu</Badge>
		<Badge color="orange">Mobile-first</Badge>
	</div>
</section>

<section>
	<h2>Palette de couleurs</h2>
	<h3>Couleurs de marque</h3>
	<div class="color-grid brand-colors">
		{#each brandColors as c (c.name)}
			<div class="color-card" style="background: {c.bg}; color: {c.text};">
				<span>{c.name}</span><span class="opacity-80 text-sm">{c.hex}</span>
			</div>
		{/each}
	</div>

	<h3>Couleurs neutres</h3>
	<div class="color-grid neutral-colors">
		{#each neutralColors as n (n)}
			<div class="neutral-card shade-{n}"><span>{n}</span></div>
		{/each}
	</div>
</section>

<section>
	<h2>Typographie</h2>
	<div class="grid-2">
		<div>
			<p class="label">Titres</p>
			<h1>Titre H1</h1>
			<h2>Titre H2</h2>
			<h3>Titre H3</h3>
		</div>
		<div>
			<p class="label">Corps</p>
			<p class="text-large">Texte large...</p>
			<p class="text-base">Texte de base...</p>
		</div>
	</div>
</section>

<section>
	<h2>Boutons</h2>
	<div class="grid-3">
		<div>
			<p class="label">Primaires</p>
			<Button variant="primary">Primaire</Button>
		</div>
		<div>
			<p class="label">Secondaires</p>
			<Button variant="secondary">Secondaire</Button>
			<div style="margin-top:1rem"><Button variant="tertiary">Réserver</Button></div>
		</div>
		<div>
			<p class="label">Icônes</p>
			<Button variant="icon-primary">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect x="2" y="4" width="20" height="16" rx="2" />
					<path d="M7 8h10M7 12h10M7 16h6" />
				</svg>
				Acheter
			</Button>
			<div style="margin-top:1rem">
				<Button variant="link">En savoir plus</Button>
			</div>
		</div>
	</div>
</section>

<section>
	<h2>Cartes</h2>
	<div class="grid-3">
		<Card align="center">
			<img
				src="https://i.pravatar.cc/150?u=marie"
				alt="Portrait de Marie Dupont"
				class="avatar"
			/>
			<h3>Marie Dupont</h3>
			<p class="text-sm text-neutral-500">Senior Developer</p>
			<Badge color="pink">React</Badge>
		</Card>

		<Card align="left">
			<div class="flex justify-between w-full mb-2">
				<Badge color="yellow" size="sm">14:30</Badge>
				<span class="text-sm text-neutral-400">45 min</span>
			</div>
			<h3>Intro React 18</h3>
			<p class="text-sm mb-4">Découvrez les fonctionnalités...</p>
			<div class="flex items-center gap-2">
				<img
					src="https://i.pravatar.cc/150?u=pierre"
					alt="Portrait de Pierre Martin"
					class="avatar-sm"
				/>
				<span class="text-sm">Pierre Martin</span>
			</div>
		</Card>
	</div>
</section>

<section>
	<h2>Formulaires</h2>
	<form class="form-stack">
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={formData.email} class="input-field" />
		</div>
		<Button variant="primary" fullWidth={true} type="submit">Envoyer</Button>
	</form>
</section>

<style>
	section {
		margin-bottom: 5rem;
	}

	.hero {
		text-align: center;
		margin: 3rem 0 6rem;
	}
	.text-gradient {
		color: var(--violet);
	}
	.tags {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	/* Grilles utilitaires */
	.color-grid {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	.brand-colors {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	.neutral-colors {
		grid-template-columns: repeat(10, 1fr);
		gap: 0.5rem;
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
	}
	.grid-3 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	/* Styles locaux pour les démos */
	.color-card {
		height: 120px;
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.neutral-card {
		height: 80px;
		border-radius: 4px;
		display: flex;
		align-items: flex-end;
		padding: 0.5rem;
		font-size: 0.75rem;
		color: var(--neutral-900);
	}

	.shade-50 {
		background: var(--neutral-50);
	}
	.shade-100 {
		background: var(--neutral-100);
	}
	.shade-200 {
		background: var(--neutral-200);
	}
	.shade-300 {
		background: var(--neutral-300);
	}
	.shade-400 {
		background: var(--neutral-400);
	}
	.shade-500 {
		background: var(--neutral-500);
		color: white;
	}
	.shade-600 {
		background: var(--neutral-600);
		color: white;
	}
	.shade-700 {
		background: var(--neutral-700);
		color: white;
	}
	.shade-800 {
		background: var(--neutral-800);
		color: white;
	}
	.shade-900 {
		background: var(--neutral-900);
		color: white;
	}

	.label {
		color: var(--neutral-500);
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-bottom: 1rem;
		object-fit: cover;
	}
	.avatar-sm {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.form-stack {
		max-width: 600px;
	}
	.form-group {
		margin-bottom: 1.5rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
	}
	.flex {
		display: flex;
	}
	.justify-between {
		justify-content: space-between;
	}
	.items-center {
		align-items: center;
	}
	.gap-2 {
		gap: 0.5rem;
	}
	.w-full {
		width: 100%;
	}
	.text-sm {
		font-size: 0.875rem;
	}
	.text-neutral-500 {
		color: var(--neutral-500);
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.mb-4 {
		margin-bottom: 1rem;
	}
</style>
