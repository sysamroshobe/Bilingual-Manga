<script>
  import { obj } from '$lib/store.js';
  import BrowseHub from '$lib/components/manga/BrowseHub.svelte';

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  let fd = 0;
  let nbk = 'All Genres';

  $: x = meta?.[0]?.manga_titles ?? [];
  $: genarr = [];
  $: genarr1 = [];
  $: genarr2 = [];
  $: genarr3 = [];
  $: genarr4 = [];

  const mergeUnique = (a, b) => {
    const out = [...b];
    a.forEach((el) => {
      if (!out.includes(el)) out.push(el);
    });
    return out;
  };

  const addUnique = (a, b) => {
    if (!b.includes(a)) b.push(a);
    return b;
  };

  $: {
    let g = [];
    let g1 = [];
    let g2 = [];
    let g3 = [];
    let g4 = [];
    x.forEach((ele) => {
      g = mergeUnique(ele.genres ?? [], g);
      g1 = mergeUnique(ele.Author ?? [], g1);
      g2 = mergeUnique(ele.Artist ?? [], g2);
      g3 = addUnique(ele.Release, g3);
      g4 = addUnique(ele.Status, g4);
    });
    g.sort();
    g1.sort();
    g2.sort();
    g3.sort();
    g4.sort();
    genarr = g;
    genarr1 = g1;
    genarr2 = g2;
    genarr3 = g3;
    genarr4 = g4;
  }

  $: hubConfigs = [
    { title: 'All Genres', items: genarr, prefix: '/manga-genre' },
    { title: 'All Years', items: genarr3, prefix: '/manga-release' },
    { title: 'All Status', items: genarr4, prefix: '/manga-status' },
    { title: 'All Authors', items: genarr1, prefix: '/manga-author' },
    { title: 'All Artists', items: genarr2, prefix: '/manga-artist' }
  ];
  $: hubConfig = hubConfigs[fd] ?? hubConfigs[0];

  function prevCategory() {
    if (fd > 0) fd -= 1;
  }

  function nextCategory() {
    if (fd < 4) fd += 1;
  }
</script>

<BrowseHub
  title={hubConfig.title}
  items={hubConfig.items}
  linkPrefix={hubConfig.prefix}
  canPrev={fd > 0}
  canNext={fd < 4}
  onPrev={prevCategory}
  onNext={nextCategory}
/>

<svelte:head>
  <title>Advanced Search - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
