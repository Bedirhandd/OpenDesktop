<script lang="ts">
  import { onMount } from 'svelte'

  let maximized = $state(false)

  onMount(() => {
    void window.api.isWindowMaximized().then((value) => {
      maximized = value
    })

    return window.api.onWindowMaximizedChanged((value) => {
      maximized = value
    })
  })
</script>

<header class="bg-surface-mute flex shrink-0 items-center justify-between border-be border-white/5 px-3 [-webkit-app-region:drag] block-9">
  <span class="text-text-secondary text-sm font-medium select-none">OpenDesktop</span>

  <div class="flex items-center [-webkit-app-region:no-drag]">
    <button
      type="button"
      class="
        text-text-secondary
        hover:text-text-primary
        flex items-center justify-center rounded-md transition-colors block-7 inline-7
        hover:bg-white/10
      "
      aria-label="Minimize"
      onclick={() => window.api.minimizeWindow()}
    >
      <svg viewBox="0 0 10 10" class="block-2.5 inline-2.5" aria-hidden="true">
        <path d="M0 5h10" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </button>

    <button
      type="button"
      class="
        text-text-secondary
        hover:text-text-primary
        flex items-center justify-center rounded-md transition-colors block-7 inline-7
        hover:bg-white/10
      "
      aria-label={maximized ? 'Restore' : 'Maximize'}
      onclick={() => window.api.maximizeWindow()}
    >
      {#if maximized}
        <svg viewBox="0 0 10 10" class="block-2.5 inline-2.5" aria-hidden="true">
          <path d="M2.5 2.5h5v5M4 0.5h5.5v5.5" fill="none" stroke="currentColor" stroke-width="1.1" />
        </svg>
      {:else}
        <svg viewBox="0 0 10 10" class="block-2.5 inline-2.5" aria-hidden="true">
          <rect x="0.6" y="0.6" width="8.8" height="8.8" fill="none" stroke="currentColor" stroke-width="1.2" />
        </svg>
      {/if}
    </button>

    <button
      type="button"
      class="
        text-text-secondary flex items-center justify-center rounded-md transition-colors block-7 inline-7
        hover:bg-red-500/80 hover:text-white
      "
      aria-label="Close"
      onclick={() => window.api.closeWindow()}
    >
      <svg viewBox="0 0 10 10" class="block-2.5 inline-2.5" aria-hidden="true">
        <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </button>
  </div>
</header>
