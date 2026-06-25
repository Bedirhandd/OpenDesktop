<script lang="ts">
  import { onMount } from 'svelte'

  import ChatPanel from '@/components/panels/ChatPanel.svelte'
  import FileExplorerPanel from '@/components/panels/FileExplorerPanel.svelte'
  import SessionsPanel from '@/components/panels/SessionsPanel.svelte'
  import TerminalPanel from '@/components/panels/TerminalPanel.svelte'
  import TitleBar from '@/components/TitleBar.svelte'

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

  <main class="flex flex-1 gap-3 p-3 min-block-0">
    <SessionsPanel />

    <div class="flex flex-1 flex-col gap-3 min-block-0 min-inline-0">
      <ChatPanel />
      <TerminalPanel />
    </div>

    <FileExplorerPanel />
  </main>
</div>
