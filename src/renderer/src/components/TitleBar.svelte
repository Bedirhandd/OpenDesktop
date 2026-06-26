<script lang="ts">
  let { maximized = false }: { maximized?: boolean } = $props()

  const titleBarButtonClass = 'text-text-secondary hover:text-text-primary flex items-center justify-center rounded-md transition-colors block-7 inline-7 hover:bg-white/10'
</script>

<header class="flex shrink-0 items-center justify-between ps-1.5 pe-3 pbs-1.5 pbe-1.5 [-webkit-app-region:drag] block-10">
  <div class="flex items-center [-webkit-app-region:no-drag]">
    <button type="button" class={titleBarButtonClass} aria-label="Toggle sidebar">
      <svg viewBox="0 0 16 16" class="block-4 inline-4" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2" />
        <path d="M6 2v12" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </button>

    <button type="button" class={titleBarButtonClass} aria-label="Search">
      <svg viewBox="0 0 16 16" class="block-4 inline-4" aria-hidden="true">
        <circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.2" />
        <path d="M10 10l3.5 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      </svg>
    </button>
  </div>

  <div class="flex items-center [-webkit-app-region:no-drag]">
    <button type="button" class={titleBarButtonClass} aria-label="Minimize" onclick={() => window.api.minimizeWindow()}>
      <svg viewBox="0 0 10 10" class="block-2.5 inline-2.5" aria-hidden="true">
        <path d="M0 5h10" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </button>

    <button type="button" class={titleBarButtonClass} aria-label={maximized ? 'Restore' : 'Maximize'} onclick={() => window.api.maximizeWindow()}>
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
