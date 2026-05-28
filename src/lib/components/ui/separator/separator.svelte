<script lang="ts">
  import { cn } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    class?: string;
    orientation?: 'horizontal' | 'vertical';
  };

  let { class: className, orientation = 'horizontal', ...restProps }: Props = $props();
</script>

<div
  role="separator"
  class={cn(
    'shrink-0 bg-border',
    orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    className
  )}
  {...restProps}
></div>
