<script>
  import { goto } from '$app/navigation';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Card, CardContent } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Search, X } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';

  export let datav;
  export let open = false;

  let query = '';

  $: titles = datav?.[0]?.manga_titles ?? [];
  $: results =
    query.trim().length === 0
      ? []
      : titles.filter((m) => {
          const hay = `${m.entit}${m.jptit}${m.search}`.toLowerCase();
          return hay.includes(query.toLowerCase());
        }).slice(0, 24);

  function close() {
    open = false;
    query = '';
  }

  function backdropClick(e) {
    if (e.target === e.currentTarget) close();
  }

  function openManga(id, lang) {
    close();
    goto(`/manga/${id}?lang=${lang}`);
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[10vh] backdrop-blur-sm"
    transition:fade={{ duration: 180 }}
    onclick={backdropClick}
    onkeydown={(e) => e.key === 'Escape' && close()}
    role="presentation"
  >
    <div
      class="w-full max-w-2xl"
      transition:fly={{ y: 12, duration: 220 }}
      role="dialog"
      aria-modal="true"
      aria-label="Search manga"
    >
      <Card class="glass-panel overflow-hidden shadow-2xl">
        <CardContent class="space-y-4 p-4">
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input bind:value={query} placeholder="Search by title, author, or keyword..." class="pl-9" />
            </div>
            <button
              class="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
              onclick={close}
              aria-label="Close search"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          {#if query.trim().length > 0}
            <div class="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
              {#if results.length === 0}
                <p class="py-8 text-center text-sm text-muted-foreground">No manga matched your search.</p>
              {:else}
                {#each results as m}
                  <div class="flex flex-col gap-2 rounded-lg border border-border/50 bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div class="min-w-0">
                      <p class="truncate font-medium">{m.entit}</p>
                      <p class="truncate text-sm text-muted-foreground">{m.jptit}</p>
                    </div>
                    <div class="flex shrink-0 gap-2">
                      <button
                        class="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium transition hover:bg-secondary/80"
                        onclick={() => openManga(m.enid, 'en')}
                      >
                        EN
                      </button>
                      <button
                        class="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium transition hover:bg-secondary/80"
                        onclick={() => openManga(m.enid, 'jp')}
                      >
                        JP
                      </button>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          {:else}
            <p class="text-center text-sm text-muted-foreground">Type to search the full library.</p>
          {/if}

          <div class="flex justify-center">
            <Badge variant="secondary">{titles.length} titles indexed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
{/if}
