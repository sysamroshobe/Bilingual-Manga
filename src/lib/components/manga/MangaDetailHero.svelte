<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Card, CardContent } from '$lib/components/ui/card/index.js';
  import ChapterListModern from './ChapterListModern.svelte';

  export let ll;
  export let data;
  export let cdncdn;
  export let urlBase;

  $: isEn = data.l === 'en';
  $: cover = isEn ? ll.coveren : ll.coverjp;
  $: title = isEn ? ll.entit : ll.jptit;
  $: synopsis = isEn ? data.manga_data.syn_en : data.manga_data.syn_jp;
  $: chapters = isEn ? data.manga_data.en_data.ch_naen : data.manga_data.jp_data.ch_najp;
  $: volumes = isEn ? data.manga_data.en_data.vol_en : data.manga_data.jp_data.vol_jp;
  $: otherLang = isEn ? 'jp' : 'en';
  $: otherLabel = isEn ? 'Switch to Japanese' : 'Switch to English';
</script>

<section class="page-enter">
  <div class="relative overflow-hidden border-b border-border/60">
    <div
      class="absolute inset-0 scale-105 bg-cover bg-center opacity-30 blur-2xl"
      style={`background-image:url(${cdncdn}/${cover})`}
    ></div>
    <div class="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
      <Card class="overflow-hidden border-border/60 bg-card/80 shadow-xl">
        <img src={`${cdncdn}/${cover}`} alt={title} class="aspect-[2/3] w-full object-cover" />
      </Card>

      <div class="flex flex-col justify-end gap-4">
        <div class="flex flex-wrap gap-2">
          {#if ll.Status}<Badge>{ll.Status}</Badge>{/if}
          {#if ll.Release}<Badge variant="secondary">{ll.Release}</Badge>{/if}
        </div>
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {#if ll.genres?.length}
          <div class="flex flex-wrap gap-2">
            {#each ll.genres.slice(0, 6) as genre}
              <Badge variant="outline">{genre}</Badge>
            {/each}
          </div>
        {/if}
        <p class="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{synopsis}</p>
        <div class="flex flex-wrap gap-2 pt-2">
          <Button href={`${urlBase}?lang=${otherLang}`}>{otherLabel}</Button>
          <Button variant="outline" href="/download">Manage offline</Button>
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <Card class="border-border/60 bg-card/60">
      <CardContent class="p-6">
        <h2 class="mb-4 text-xl font-semibold">Chapters</h2>
        <ChapterListModern {chapters} {volumes} lang={data.l} {urlBase} />
      </CardContent>
    </Card>
  </div>
</section>

