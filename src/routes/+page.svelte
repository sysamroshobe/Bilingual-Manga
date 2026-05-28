<script>
  import { obj } from '$lib/store.js';
  import MangaCatalog from '$lib/components/manga/MangaCatalog.svelte';

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  $: x = meta?.[0]?.manga_titles ?? [];
  $: cdncdn = meta?.[0]?.cdn ?? '';
  $: cdncdn1 = meta?.[0]?.cdn1 ?? '';
</script>

<MangaCatalog
  {x}
  {cdncdn}
  {cdncdn1}
  title="All Manga"
  subtitle="Explore the full bilingual library with English translations and Japanese raw chapters."
/>

<svelte:head>
  <title>Home - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
