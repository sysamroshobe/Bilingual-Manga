<script>
  import '../app.css';
  import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
  import { obj } from '$lib/store.js';

  export let data;
  obj.set(data.meta);
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
  {@html data.meta[0].inhtml['head']}
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden">
  <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background"></div>
  <SiteHeader datav={data.meta} />
  <main>
    <slot />
  </main>
</div>
