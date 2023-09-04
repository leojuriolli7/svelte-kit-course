<script>
	import { page } from '$app/stores';
</script>

<h1>Search page</h1>

<p>Results for {$page.url.searchParams.get('q')}</p>
