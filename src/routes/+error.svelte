<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { page } from '$app/stores';
</script>

<section class="page-enter mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-16">
  <Card class="w-full border-border/60 bg-card/80 text-center">
    <CardHeader>
      <CardTitle class="text-2xl">Page not found</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-sm text-muted-foreground">
        {$page.status ?? 404} — {$page.error?.message ?? 'The page you requested could not be loaded.'}
      </p>
      <Button href="/">Return to library</Button>
    </CardContent>
  </Card>
</section>

<svelte:head>
  <title>Error - Bilingual Manga</title>
</svelte:head>
