<script>
  import MangaApp from '$lib/MangaApp.svelte';
  import MangaDetailHero from '$lib/components/manga/MangaDetailHero.svelte';
  import ReaderShell from '$lib/components/reader/ReaderShell.svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { obj } from '$lib/store.js';
  import { page } from '$app/stores';

  export let data;

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  $: x = meta?.[0]?.manga_titles ?? [];
  $: cdncdn = meta?.[0]?.cdn ?? '';
  $: cdncdn1 = meta?.[0]?.cdn1 ?? '';
  $: prel = parseInt(meta?.[0]?.prel ?? '0');
  $: delayml = parseInt(meta?.[0]?.delayml ?? '10000');
  $: urlBase = `${$page.url}`.split('?')[0];

  $: ll =
    x.find((element) => element.enid === data.p) ?? {};

  $: inReader =
    (data.chen != null && data.chen !== undefined && `${data.chen}`.length > 0 && parseInt(data.chen) >= 0) ||
    (data.chjp != null && data.chjp !== undefined && `${data.chjp}`.length > 0 && parseInt(data.chjp) >= 0);

  $: langt = data.l === 'en' ? 'ENG' : 'JP';
  $: chengt = data.chen != null && data.chen !== undefined && `${data.chen}`.length > 0 && parseInt(data.chen) >= 0 ? data.chen : '0';
  $: chjpt = data.chjp != null && data.chjp !== undefined && `${data.chjp}`.length > 0 && parseInt(data.chjp) >= 0 ? data.chjp : '0';
  $: enp = data.enp != null && data.enp !== undefined && `${data.enp}`.length > 0 && parseInt(data.enp) >= 0 ? data.enp : '0';
  $: jpp = data.jpp != null && data.jpp !== undefined && `${data.jpp}`.length > 0 && parseInt(data.jpp) >= 0 ? data.jpp : '0';
  $: hasMangaData = !data.missingData;
  $: imgdata = hasMangaData && 'img_data' in data.manga_data ? data.manga_data.img_data : {};
  $: readerTitle = data.l === 'en' ? ll.entit : ll.jptit;
</script>

{#if data.missingData}
  <section class="mx-auto max-w-2xl px-4 py-12">
    <Card class="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Chapter Data Missing</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4 text-sm text-muted-foreground">
        <p>
          This title exists in metadata but is missing from your `BM_data.manga_data.json`.
        </p>
        <p>
          Manga: <strong>{data?.missingTitle?.entit ?? data?.missingTitle?.jptit ?? data.p}</strong>
        </p>
        <div class="flex gap-2">
          <Button href="/">Back to Library</Button>
          <Button variant="outline" href="/download">Manage Offline Data</Button>
        </div>
      </CardContent>
    </Card>
  </section>
{:else if inReader}
  <ReaderShell title={readerTitle} backHref={urlBase}>
    <MangaApp
      {delayml}
      {prel}
      ipfsgate={data.ipfs}
      {cdncdn}
      {cdncdn1}
      cheng={parseInt(chengt)}
      chjpn={parseInt(chjpt)}
      enp={[enp]}
      jpp={[jpp]}
      lang={langt}
      endata={data.manga_data.en_data}
      jpdata={data.manga_data.jp_data}
      chaptersen={data.manga_data.en_data.ch_naen}
      chaptersjp={data.manga_data.jp_data.ch_najp}
      volumesen={data.manga_data.en_data.vol_en}
      volumesjp={data.manga_data.jp_data.vol_jp}
      {imgdata}
    />
  </ReaderShell>
{:else}
  <MangaDetailHero {ll} {data} {cdncdn} {urlBase} />
{/if}

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="ja_JP" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:site_name" content="Bilingual Manga" />
  {#if data.l === 'en'}
    <title>{ll.entit} - Bilingual Manga</title>
    <meta name="description" content={data.manga_data.syn_en} />
    <meta property="og:title" content={ll.entit} />
    <meta property="og:description" content={data.manga_data.syn_en} />
    <meta property="og:image" content="{cdncdn}/{ll.coveren}" />
  {:else}
    <title>{ll.jptit} - Bilingual Manga</title>
    <meta name="description" content={data.manga_data.syn_jp} />
    <meta property="og:title" content={ll.jptit} />
    <meta property="og:description" content={data.manga_data.syn_jp} />
    <meta property="og:image" content="{cdncdn}/{ll.coverjp}" />
  {/if}
</svelte:head>
