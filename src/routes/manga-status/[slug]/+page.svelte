<script>
  import { obj } from '$lib/store.js';
  import { page } from '$app/stores';
  import MangaCatalog from '$lib/components/manga/MangaCatalog.svelte';

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  $: x = meta?.[0]?.manga_titles ?? [];
  $: cdncdn = meta?.[0]?.cdn ?? '';
  $: cdncdn1 = meta?.[0]?.cdn1 ?? '';
  $: match = $page.params.slug;
  $: filtered = x.filter((el) => el.Status?.includes(match));
</script>

<MangaCatalog x={filtered} {cdncdn} {cdncdn1} title="{match} Manga" subtitle="Titles with this publication status." />

<svelte:head>
  <title>{match} Archives - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
