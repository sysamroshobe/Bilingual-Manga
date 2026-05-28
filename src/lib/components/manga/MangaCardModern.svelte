<script>
  import { Card } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';

  /** @type {{ data: any, ls?: string, cdncdn: string, cdncdn1?: string }} */
  export let data;
  export let ls = 'all';
  export let cdncdn;
  export let cdncdn1 = '';

  $: coverPath = ls === 'jp' ? data.coverjp : data.coveren;
  $: title = ls === 'jp' ? data.jptit : data.entit;
  $: href = `/manga/${data.enid}?lang=${ls === 'jp' ? 'jp' : 'en'}`;
  $: remoteCoverUrl = `${cdncdn}/${coverPath}`;
  $: localCoverUrl = cdncdn1 ? `${cdncdn1}/${coverPath}` : '';
  $: activeCoverUrl = remoteCoverUrl;
  let triedLocalFallback = false;
  let hideBrokenImage = false;

  $: if (remoteCoverUrl) {
    activeCoverUrl = remoteCoverUrl;
    triedLocalFallback = false;
    hideBrokenImage = false;
  }

  function onCoverError() {
    if (!triedLocalFallback && localCoverUrl) {
      triedLocalFallback = true;
      activeCoverUrl = localCoverUrl;
      return;
    }
    hideBrokenImage = true;
  }
</script>

<a href={href} data-sveltekit-prefetch class="group block h-full">
  <Card class="h-full overflow-hidden border-border/60 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
    <div class="relative aspect-[2/3] overflow-hidden bg-muted">
      {#if !hideBrokenImage}
        <img
          src={activeCoverUrl}
          alt={title}
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          on:error={onCoverError}
        />
      {:else}
        <div class="absolute inset-0 grid place-items-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-200">
          <span class="px-4 text-center text-xs uppercase tracking-wide">Cover unavailable</span>
        </div>
      {/if}
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-3">
        <p class="line-clamp-2 text-sm font-semibold leading-snug text-white">{title}</p>
      </div>
      {#if data.Status}
        <Badge class="absolute right-2 top-2" variant="secondary">{data.Status}</Badge>
      {/if}
    </div>
  </Card>
</a>

{#if ls === 'all'}
  <!-- dual-language mode renders EN + JP cards from parent -->
{/if}
