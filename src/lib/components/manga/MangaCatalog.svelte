<script>
  import { page } from '$app/stores';
  import MangaCardModern from './MangaCardModern.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Download } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';

  export let x = [];
  export let cdncdn = '';
  export let cdncdn1 = '';
  export let title = 'Library';
  export let subtitle = 'Browse bilingual manga with side-by-side reading.';
  const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });

  $: urlBase = `${$page.url}`.split('?')[0];
  $: ls = $page.url.searchParams.get('ls') ?? 'all';
  $: sort = $page.url.searchParams.get('sort') ?? 'recent';
  $: pagen = parseInt($page.url.searchParams.get('page') ?? '1');
  $: numPerPage = ls === 'en' || ls === 'jp' ? 24 : 12;
  $: sortedItems = [...x].sort((a, b) => {
    if (sort === 'az') return collator.compare(a?.entit ?? '', b?.entit ?? '');
    if (sort === 'za') return collator.compare(b?.entit ?? '', a?.entit ?? '');
    if (sort === 'year_new') return (parseInt(b?.Release ?? '0', 10) || 0) - (parseInt(a?.Release ?? '0', 10) || 0);
    if (sort === 'year_old') return (parseInt(a?.Release ?? '9999', 10) || 9999) - (parseInt(b?.Release ?? '9999', 10) || 9999);
    return 0;
  });
  $: totalPages = Math.max(1, Math.ceil(sortedItems.length / numPerPage));
  $: currentPage = pagen >= 1 && pagen <= totalPages ? pagen : 1;
  $: pageItems = sortedItems.filter((_, i) => Math.ceil((i + 1) / numPerPage) === currentPage);

  function pageHref(pageNum, language = ls, sortMode = sort) {
    return `${urlBase}?page=${pageNum}&ls=${language}&sort=${sortMode}`;
  }
</script>

<section class="page-enter mx-auto max-w-7xl px-4 py-8 sm:px-6">
  <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p class="text-sm font-medium uppercase tracking-widest text-primary">Bilingual Manga</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p class="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">{x.length} titles</Badge>
      <Button variant="outline" size="sm" href="/download">
        <Download class="h-4 w-4" />
        Offline
      </Button>
    </div>
  </div>

  <div class="mb-6 inline-flex rounded-lg bg-muted p-1">
    <a
      href={pageHref(1, 'all')}
      class={cn(
        'rounded-md px-4 py-2 text-sm font-medium transition',
        ls === 'all' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      All
    </a>
    <a
      href={pageHref(1, 'en')}
      class={cn(
        'rounded-md px-4 py-2 text-sm font-medium transition',
        ls === 'en' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      English TL
    </a>
    <a
      href={pageHref(1, 'jp')}
      class={cn(
        'rounded-md px-4 py-2 text-sm font-medium transition',
        ls === 'jp' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      Japanese RAW
    </a>
  </div>
  <div class="mb-6">
    <label for="catalog-sort" class="mr-2 text-sm text-muted-foreground">Sort:</label>
    <select
      id="catalog-sort"
      class="rounded-md border border-input bg-background px-3 py-2 text-sm"
      value={sort}
      onchange={(e) => {
        const nextSort = e.currentTarget.value;
        location.href = pageHref(1, ls, nextSort);
      }}
    >
      <option value="recent">Default (recent first)</option>
      <option value="az">Alphabetical (A-Z)</option>
      <option value="za">Alphabetical (Z-A)</option>
      <option value="year_new">Chronological (newest first)</option>
      <option value="year_old">Chronological (oldest first)</option>
    </select>
  </div>

  {#if pageItems.length === 0}
    <div class="rounded-xl border border-dashed border-border py-20 text-center">
      <p class="text-lg font-medium">No manga found</p>
      <p class="mt-2 text-sm text-muted-foreground">Try another filter or search term.</p>
    </div>
  {:else if ls === 'all'}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each pageItems as manga}
        <div class="grid grid-cols-2 gap-3">
          <MangaCardModern data={manga} ls="en" {cdncdn} {cdncdn1} />
          <MangaCardModern data={manga} ls="jp" {cdncdn} {cdncdn1} />
        </div>
      {/each}
    </div>
  {:else}
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {#each pageItems as manga}
        <MangaCardModern data={manga} ls={ls} {cdncdn} {cdncdn1} />
      {/each}
    </div>
  {/if}

  {#if totalPages > 1}
    <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
      {#if currentPage > 1}
        <Button variant="outline" size="sm" href={pageHref(1)}>First</Button>
        <Button variant="outline" size="sm" href={pageHref(currentPage - 1)}>Previous</Button>
      {/if}
      <Badge variant="outline">Page {currentPage} / {totalPages}</Badge>
      {#if currentPage < totalPages}
        <Button variant="outline" size="sm" href={pageHref(currentPage + 1)}>Next</Button>
        <Button variant="outline" size="sm" href={pageHref(totalPages)}>Last</Button>
      {/if}
    </div>
  {/if}
</section>
