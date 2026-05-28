<script>
  import { onMount } from 'svelte';
  import { obj } from '$lib/store.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Download, Trash2 } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  $: x12 = meta?.[0]?.manga_titles?.slice().reverse() ?? [];
  $: cdncdn1 = meta?.[0]?.cdn1 ?? '';
  $: availableDataIds = new Set(meta?.[0]?.manga_data_ids ?? []);
  $: downloadableCount = x12.filter((m) => hasPagesInDb(m.enid)).length;
  $: missingCount = x12.length - downloadableCount;

  let lan = 'JPN';
  let sortMode = 'recent';
  let chk = {};
  let downloadedIds = new Set();
  const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });

  onMount(dwdata);

  function hasPagesInDb(mangaId) {
    return availableDataIds.has(mangaId);
  }

  function buildSelectionPayload(onlyDownloadable = false) {
    const out = {};
    for (const mangaId in chk) {
      if (!chk[mangaId]) continue;
      if (onlyDownloadable && !hasPagesInDb(mangaId)) continue;
      out[mangaId] = true;
    }
    return out;
  }

  function titleForSort(manga) {
    return `${manga?.entit ?? ''}`.trim().toLowerCase();
  }

  function releaseYear(manga) {
    const raw = `${manga?.Release ?? ''}`;
    const y = Number.parseInt(raw, 10);
    return Number.isNaN(y) ? Number.MIN_SAFE_INTEGER : y;
  }

  function toggleLang() {
    lan = lan === 'JPN' ? 'ENG' : 'JPN';
  }

  function fetdw() {
    const payload = buildSelectionPayload(true);
    if (Object.keys(payload).length === 0) return;

    fetch(`${cdncdn1}/download`, {
      method: 'post',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        refr1();
        dwdata();
      })
      .catch(console.log);
  }

  function fetdw1() {
    const payload = buildSelectionPayload(false);
    if (Object.keys(payload).length === 0) return;

    fetch(`${cdncdn1}/remove`, {
      method: 'post',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        refr1();
        dwdata();
      })
      .catch(console.log);
  }

  function dwdata() {
    fetch(`${cdncdn1}/json/dw.json`)
      .then((response) => response.json())
      .then((data3) => {
        downloadedIds = new Set(data3.pm ?? []);
      })
      .catch(console.log);
  }

  function refr1() {
    chk = {};
  }

  function refr() {
    refr1();
  }

  function sela() {
    const next = { ...chk };
    for (const manga of sortedItems) {
      if (hasPagesInDb(manga.enid)) next[manga.enid] = true;
    }
    chk = next;
  }

  function seld() {
    fetch(`${cdncdn1}/json/dw.json`)
      .then((response) => response.json())
      .then((data3) => {
        const pmd = new Set(data3.pm ?? []);
        const next = { ...chk };
        for (const manga of sortedItems) {
          if (pmd.has(manga.enid)) next[manga.enid] = true;
        }
        chk = next;
      })
      .catch(console.log);
  }

  function seldu() {
    fetch(`${cdncdn1}/json/dw.json`)
      .then((response) => response.json())
      .then((data3) => {
        const pmd = new Set(data3.pm ?? []);
        const next = { ...chk };
        for (const manga of sortedItems) {
          if (pmd.has(manga.enid)) next[manga.enid] = false;
        }
        chk = next;
      })
      .catch(console.log);
  }

  function onCheckChange(mangaId) {
    if (!hasPagesInDb(mangaId)) {
      chk[mangaId] = false;
      return;
    }
    if (!chk[mangaId]) dwdata();
  }

  $: sortedItems = [...x12].sort((a, b) => {
    if (sortMode === 'az') return collator.compare(titleForSort(a), titleForSort(b));
    if (sortMode === 'za') return collator.compare(titleForSort(b), titleForSort(a));
    if (sortMode === 'year_new') return releaseYear(b) - releaseYear(a);
    if (sortMode === 'year_old') return releaseYear(a) - releaseYear(b);
    return 0;
  });
  $: selectedDownloadable = Object.keys(chk).filter((k) => chk[k] && hasPagesInDb(k)).length;
</script>

<section class="page-enter mx-auto max-w-5xl px-4 py-8 sm:px-6">
  <div class="mb-6">
    <h1 class="text-3xl font-bold tracking-tight">Offline Library</h1>
    <p class="mt-2 text-muted-foreground">
      Select manga to download or remove from your local offline cache. Titles without chapter data are disabled.
    </p>
    <div class="mt-3 flex flex-wrap gap-2 text-xs">
      <Badge variant="secondary">Pages in DB ({downloadableCount})</Badge>
      <Badge variant="outline">Missing pages ({missingCount})</Badge>
      <Badge>Completed</Badge>
    </div>
    <div class="mt-4 flex items-center gap-2">
      <label for="sort-mode" class="text-sm text-muted-foreground">Sort:</label>
      <select
        id="sort-mode"
        bind:value={sortMode}
        class="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        <option value="recent">Default (recent first)</option>
        <option value="az">Alphabetical (A-Z)</option>
        <option value="za">Alphabetical (Z-A)</option>
        <option value="year_new">Chronological (newest first)</option>
        <option value="year_old">Chronological (oldest first)</option>
      </select>
    </div>
  </div>

  <Card class="mb-6 border-border/60 bg-card/70">
    <CardHeader>
      <CardTitle class="text-lg">Bulk actions</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onclick={toggleLang}>Language: {lan}</Button>
      <Button size="sm" onclick={fetdw} disabled={selectedDownloadable === 0}>
        <Download class="h-4 w-4" />
        Download selected ({selectedDownloadable})
      </Button>
      <Button variant="destructive" size="sm" onclick={fetdw1}>
        <Trash2 class="h-4 w-4" />
        Delete selected
      </Button>
      <Button variant="secondary" size="sm" onclick={sela}>Select all downloadable</Button>
      <Button variant="secondary" size="sm" onclick={refr}>Clear selection</Button>
      <Button variant="outline" size="sm" onclick={seld}>Select downloaded</Button>
      <Button variant="outline" size="sm" onclick={seldu}>Unselect downloaded</Button>
    </CardContent>
  </Card>

  <Card class="border-border/60 bg-card/60">
    <CardContent class="max-h-[70vh] overflow-y-auto p-4">
      <ol class="space-y-2 text-left">
        {#each sortedItems as name}
          {@const downloadable = hasPagesInDb(name.enid)}
          <li
            class={cn(
              'rounded-md border px-3 py-2 transition-colors',
              downloadable ? 'border-border/40 bg-background/40' : 'border-dashed border-border/30 bg-muted/20 opacity-55',
              chk[name.enid] && downloadable && 'border-primary/40 bg-primary/5'
            )}
          >
            <label
              class={cn(
                'flex flex-wrap items-center gap-2 sm:gap-3',
                downloadable ? 'cursor-pointer' : 'cursor-not-allowed'
              )}
            >
              <input
                type="checkbox"
                bind:checked={chk[name.enid]}
                disabled={!downloadable}
                on:change={() => onCheckChange(name.enid)}
                class="h-4 w-4 rounded border-border accent-primary disabled:cursor-not-allowed disabled:opacity-40"
              />
              <span class={cn('min-w-0 flex-1 text-sm', !downloadable && 'text-muted-foreground')}>
                {lan === 'JPN' ? name.entit : name.jptit}
              </span>
              {#if downloadable}
                <Badge variant="secondary">Pages in DB</Badge>
              {:else}
                <Badge variant="outline">Missing pages — cannot download</Badge>
              {/if}
              {#if downloadedIds.has(name.enid)}
                <Badge>Completed</Badge>
              {/if}
              {#if chk[name.enid] && downloadable}
                <Badge variant="secondary">Selected</Badge>
              {/if}
            </label>
          </li>
        {/each}
      </ol>
    </CardContent>
  </Card>
</section>

<svelte:head>
  <title>Download - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
