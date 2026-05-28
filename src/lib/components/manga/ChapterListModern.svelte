<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { ChevronDown, ChevronRight } from 'lucide-svelte';

  export let chapters = [];
  export let volumes = {};
  export let lang = 'en';
  export let urlBase = '';

  let openVolumes = { 0: true };

  $: volumeNames = Object.keys(volumes);

  function toggleVolume(index) {
    openVolumes[index] = !openVolumes[index];
    openVolumes = { ...openVolumes };
  }

  function chapterHref(index) {
    if (lang === 'en') {
      return `${urlBase}?lang=en&chen=${index}&chjp=0&enp=0&jpp=0#img_store`;
    }
    return `${urlBase}?lang=jp&chen=0&chjp=${index}&enp=0&jpp=0#img_store`;
  }
</script>

<div class="space-y-4">
  {#each volumeNames as volumeName, volumeIndex}
    <div class="rounded-lg border border-border/60 bg-background/40">
      <button
        type="button"
        class="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition hover:bg-accent/50"
        onclick={() => toggleVolume(volumeIndex)}
      >
        <span>{volumeName}</span>
        {#if openVolumes[volumeIndex]}
          <ChevronDown class="h-4 w-4 text-muted-foreground" />
        {:else}
          <ChevronRight class="h-4 w-4 text-muted-foreground" />
        {/if}
      </button>

      {#if openVolumes[volumeIndex]}
        <div class="grid gap-2 border-t border-border/50 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {#each chapters.slice(volumes[volumeName].s, volumes[volumeName].e + 1) as chapterName, offset}
            {@const chapterIndex = volumes[volumeName].s + offset}
            <Button variant="outline" class="h-auto justify-start px-3 py-2 text-left" href={chapterHref(chapterIndex)}>
              <span class="line-clamp-2 text-sm">{chapterName}</span>
            </Button>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  {#if volumeNames.length === 0}
    <div class="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
      No chapter list available for this language.
    </div>
  {/if}
</div>
