<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import type { Snippet } from 'svelte';

  type Props = TabsPrimitive.ContentProps & { class?: string; children?: Snippet };
  let { class: className, children, ...restProps }: Props = $props();
</script>

<TabsPrimitive.Content
  class={cn('mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Content>
