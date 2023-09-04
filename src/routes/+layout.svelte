<script lang="ts">
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
		<form action="/login?/logout" method="POST">
			<button type="submit">Logout</button>
		</form>
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
