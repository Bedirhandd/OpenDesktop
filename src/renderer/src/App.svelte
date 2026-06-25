<script lang="ts">
  import { onMount } from 'svelte'

  import TitleBar from './components/TitleBar.svelte'

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

<div
  class="
    bg-surface flex flex-col overflow-hidden min-block-screen
    {maximized ? '' : 'rounded-window shadow-window border border-white/8'}
  "
>
  <TitleBar {maximized} />

  <main class="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
    <h1 class="text-3xl font-bold tracking-tight">OpenDesktop</h1>
    <p class="text-text-secondary text-base/relaxed max-inline-md">Desktop UI application shell for AI coding agents</p>
  </main>
</div>
