<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { ArrowLeft } from 'lucide-svelte';

  export let title = 'Reader';
  export let backHref = '/';
</script>

<div class="min-h-screen bg-[#0a0a0c]">
  <div class="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
    <div class="mx-auto flex h-14 max-w-[1800px] items-center gap-3 px-4">
      <Button variant="ghost" size="sm" href={backHref} class="text-zinc-200 hover:text-white">
        <ArrowLeft class="h-4 w-4" />
        Back
      </Button>
      <p class="truncate text-sm font-medium text-zinc-300">{title}</p>
    </div>
  </div>
  <div class="reader-legacy-host">
    <slot />
  </div>
</div>

<style>
  :global(.reader-legacy-host) {
    color: whitesmoke;
  }

  :global(.reader-legacy-host #ch-i),
  :global(.reader-legacy-host #ch-i1) {
    border-radius: 0.375rem;
    transition: opacity 0.25s ease;
  }
</style>
