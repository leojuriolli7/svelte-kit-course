<script lang="ts">
	export let data;

	$: product = data.product;
	$: commentsPromise = data.nested.comments;
</script>

<div>
	<img src={product.thumbnail} alt={product.title} />

	<h1>
		{product.title}
	</h1>

	<p>{product.description}</p>

	{#await commentsPromise}
		<p>Loading comments...</p>
	{:then data}
		{#each data.comments as comment}
			<p>{comment.body}</p>
		{/each}
	{/await}
</div>

<style>
	img {
		width: 100%;
		max-width: 400px;
	}
</style>
