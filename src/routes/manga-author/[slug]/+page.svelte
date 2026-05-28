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

  function matchesAuthor(el, matchSlug) {
    return el.Author?.some((elem) => {
      const slug = elem.replaceAll(' ', '-').replaceAll("'", '').toLowerCase();
      return `${elem}` === matchSlug || slug === matchSlug;
    });
  }

  $: filtered = x.filter((el) => matchesAuthor(el, match));
</script>

<MangaCatalog x={filtered} {cdncdn} {cdncdn1} title="{match}'s Manga" subtitle="Titles by this author in your library." />

<svelte:head>
  <title>{match} Archives - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
