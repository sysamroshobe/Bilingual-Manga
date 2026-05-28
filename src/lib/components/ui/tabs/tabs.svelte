<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type Props = TabsPrimitive.RootProps & { class?: string };
  let { class: className, value = $bindable(''), ...restProps }: Props = $props();
</script>

<TabsPrimitive.Root bind:value class={cn('w-full', className)} {...restProps} />
