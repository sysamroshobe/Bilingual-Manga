<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button/index.js';
  import SearchCommand from '$lib/components/search/SearchCommand.svelte';
  import { BookOpen, Info, Search, SlidersHorizontal } from 'lucide-svelte';

  export let datav;

  let searchOpen = false;

  $: path = $page.url.pathname;
</script>

<header class="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
  <div class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
    <a href="/" class="group flex items-center gap-3 transition-opacity hover:opacity-90">
      <img src="/L.png" alt="Bilingual Manga" class="h-9 w-9 rounded-lg ring-1 ring-border/80" />
      <div class="hidden sm:block">
        <p class="text-sm font-semibold tracking-tight">Bilingual Manga</p>
        <p class="text-xs text-muted-foreground">Learn Japanese through manga</p>
      </div>
    </a>

    <nav class="ml-auto flex items-center gap-1">
      <Button
        variant={path === '/' ? 'secondary' : 'ghost'}
        size="sm"
        class="hidden md:inline-flex"
        href="/"
      >
        <BookOpen class="h-4 w-4" />
        Library
      </Button>
      <Button
        variant={path.startsWith('/advanced') ? 'secondary' : 'ghost'}
        size="sm"
        href="/advanced"
      >
        <SlidersHorizontal class="h-4 w-4" />
        <span class="hidden sm:inline">Browse</span>
      </Button>
      <Button variant="ghost" size="icon" onclick={() => (searchOpen = true)} aria-label="Search">
        <Search class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" href="/about" aria-label="About">
        <Info class="h-4 w-4" />
      </Button>
    </nav>
  </div>
</header>

<SearchCommand bind:open={searchOpen} {datav} />
