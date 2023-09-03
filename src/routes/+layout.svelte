<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	export let data;

	$: getPageTitle = () => {
		const title = $page.data?.title;
		if (title) return `Website Title - ${title}`;

		return 'Website Title';
	};
</script>

<nav>
	<a href="/"> Home</a>
	<a href="/products"> Products</a>

	{#if !data.user}
		<a href="/login"> Login</a>
	{/if}

	{#if !!data.user}
		<button
			on:click={async () => {
				const res = await fetch('/api/logout', {
					method: 'POST'
				});

				if (res.ok) {
					invalidateAll();
				}
			}}
			>Logout
		</button>
	{/if}
</nav>

<svelte:head>
	<title>{getPageTitle()}</title>

	{#if $page.data?.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

<main>
	{#if data.user}
		<p>Logged in as {data.user.name}</p>
	{/if}

	<slot />
</main>

<style>
	main {
		padding: 32px;
	}
</style>
