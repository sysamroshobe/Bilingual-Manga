<script>
  import { obj } from '$lib/store.js';
  import { Card, CardContent } from '$lib/components/ui/card/index.js';

  let meta;
  obj.subscribe((value) => {
    meta = value;
  });

  $: content = meta?.[0]?.inhtml?.about ?? '';
</script>

<section class="page-enter mx-auto max-w-4xl px-4 py-10 sm:px-6">
  <h1 class="text-3xl font-bold tracking-tight">About</h1>
  <p class="mt-2 text-muted-foreground">Project information and usage notes.</p>
  <Card class="prose prose-invert mt-6 max-w-none border-border/60 bg-card/70">
    <CardContent class="p-6 text-left text-sm leading-relaxed [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
      {@html content}
    </CardContent>
  </Card>
</section>

<svelte:head>
  <title>About - Bilingual Manga</title>
  {#if meta}
    {@html meta[0].inhtml['metades']}
  {/if}
</svelte:head>
