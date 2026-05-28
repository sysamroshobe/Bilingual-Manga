<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let items = [];
  export let title = 'Browse';
  export let linkPrefix = '/manga-genre';

  export let onPrev = () => {};
  export let onNext = () => {};
  export let canPrev = false;
  export let canNext = false;
</script>

<section class="page-enter mx-auto max-w-7xl px-4 py-8 sm:px-6">
  <Card class="border-border/60 bg-card/70">
    <CardHeader class="flex flex-row items-center justify-between gap-4">
      <CardTitle class="text-2xl">{title}</CardTitle>
      <div class="flex gap-2">
        {#if canPrev}
          <Button variant="outline" size="icon" onclick={onPrev} aria-label="Previous category">
            <ChevronLeft class="h-4 w-4" />
          </Button>
        {/if}
        {#if canNext}
          <Button variant="outline" size="icon" onclick={onNext} aria-label="Next category">
            <ChevronRight class="h-4 w-4" />
          </Button>
        {/if}
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap gap-2">
        {#each items as item}
          <Button variant="secondary" size="sm" href="{linkPrefix}/{item}">
            {item}
          </Button>
        {/each}
      </div>
    </CardContent>
  </Card>
</section>
