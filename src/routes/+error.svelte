<script>
	import { page } from '$app/stores';
</script>

<h1>Root Error Page</h1>

<h2>{$page.status} - {$page.error?.message}</h2>
