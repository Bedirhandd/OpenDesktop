<script lang="ts">
  import { onMount } from 'svelte'

  import ChatPanel from '@/components/panels/ChatPanel.svelte'
  import FileExplorerPanel from '@/components/panels/FileExplorerPanel.svelte'
  import SessionsPanel from '@/components/panels/SessionsPanel.svelte'
  import TerminalPanel from '@/components/panels/TerminalPanel.svelte'
  import ResizeHandle from '@/components/ResizeHandle.svelte'
  import TitleBar from '@/components/TitleBar.svelte'
  import { clamp, LAYOUT } from '@/lib/layout'

  let maximized = $state(false)
  let sessionsWidth = $state(LAYOUT.sessionsWidth)
  let explorerWidth = $state(LAYOUT.explorerWidth)
  let terminalHeight = $state(LAYOUT.terminalHeight)
  let centerHeight = $state(0)
  let layoutWidth = $state(0)

  function maxSessionsWidth(): number {
    if (layoutWidth === 0) return LAYOUT.maxSessionsWidth

    const available = layoutWidth - LAYOUT.mainHorizontalPadding - LAYOUT.handleSize * 2 - explorerWidth - LAYOUT.minCenterWidth

    return Math.min(LAYOUT.maxSessionsWidth, available)
  }

  function maxExplorerWidth(): number {
    if (layoutWidth === 0) return LAYOUT.maxExplorerWidth

    const available = layoutWidth - LAYOUT.mainHorizontalPadding - LAYOUT.handleSize * 2 - sessionsWidth - LAYOUT.minCenterWidth

    return Math.min(LAYOUT.maxExplorerWidth, available)
  }

  function maxTerminalHeight(): number {
    const available = centerHeight - LAYOUT.minChatHeight - LAYOUT.handleSize

    return Math.min(LAYOUT.maxTerminalHeight, Math.max(LAYOUT.minTerminalHeight, available))
  }

  function resizeSessions(delta: number): void {
    sessionsWidth = clamp(sessionsWidth + delta, LAYOUT.minSessionsWidth, maxSessionsWidth())
  }

  function resizeExplorer(delta: number): void {
    explorerWidth = clamp(explorerWidth + delta, LAYOUT.minExplorerWidth, maxExplorerWidth())
  }

  function resizeTerminal(delta: number): void {
    terminalHeight = clamp(terminalHeight + delta, LAYOUT.minTerminalHeight, maxTerminalHeight())
  }

  $effect(() => {
    sessionsWidth = clamp(sessionsWidth, LAYOUT.minSessionsWidth, maxSessionsWidth())
    explorerWidth = clamp(explorerWidth, LAYOUT.minExplorerWidth, maxExplorerWidth())
    terminalHeight = clamp(terminalHeight, LAYOUT.minTerminalHeight, maxTerminalHeight())
  })

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

  <main bind:clientWidth={layoutWidth} class="flex flex-1 p-3 min-block-0">
    <div class="shrink-0 overflow-hidden min-inline-0" style:width="{sessionsWidth}px">
      <SessionsPanel />
    </div>

    <ResizeHandle orientation="vertical" edge="start" onResize={resizeSessions} />

    <div bind:clientHeight={centerHeight} class="flex flex-1 flex-col min-block-0 min-inline-0">
      <div class="flex-1 overflow-hidden min-block-0">
        <ChatPanel />
      </div>

      <ResizeHandle orientation="horizontal" edge="end" onResize={resizeTerminal} />

      <div class="shrink-0 overflow-hidden min-block-0" style:height="{terminalHeight}px">
        <TerminalPanel />
      </div>
    </div>

    <ResizeHandle orientation="vertical" edge="end" onResize={resizeExplorer} />

    <div class="shrink-0 overflow-hidden min-inline-0" style:width="{explorerWidth}px">
      <FileExplorerPanel />
    </div>
  </main>
</div>
