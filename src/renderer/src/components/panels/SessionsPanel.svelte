<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { slide, type TransitionConfig } from 'svelte/transition'

  import SessionRunningIndicator from '@/components/SessionRunningIndicator.svelte'
  import SessionsPanelAccountFooter from '@/components/SessionsPanelAccountFooter.svelte'
  import { SESSION_PROJECTS, type Session } from '@/lib/sessions'

  const workspaceNavItems = [
    { id: 'skills', label: 'Skills' },
    { id: 'automations', label: 'Automations' },
    { id: 'plugins', label: 'Plugins' }
  ] as const

  const sidebarActionRowClass = 'flex shrink-0 items-center gap-2.5 rounded-lg p-2 text-sm font-medium transition-colors inline-full text-start hover:bg-white/6'

  const sidebarIconSlotClass = 'flex shrink-0 items-center justify-center block-7 inline-7'

  const sidebarNavRowClass = `text-text-secondary hover:text-text-primary ${sidebarActionRowClass}`

  const projectSessionsTransition = { duration: 200, easing: quintOut }

  function slideFade(node: Element, params: { duration?: number; easing?: (value: number) => number } = {}): TransitionConfig {
    const slideTransition = slide(node, params)

    return {
      duration: slideTransition.duration,
      easing: slideTransition.easing,
      css: (t, u) => {
        const slideCss = slideTransition.css?.(t, u) ?? ''
        return `${slideCss}${slideCss ? ';' : ''}opacity:${t}`
      }
    }
  }

  let collapsedProjects = $state<Record<string, boolean>>({})

  function isProjectExpanded(projectId: string): boolean {
    return !collapsedProjects[projectId]
  }

  function toggleProject(projectId: string): void {
    collapsedProjects[projectId] = !collapsedProjects[projectId]
  }

  function sessionStatusLabel(session: Session): string {
    return session.status === 'running' ? 'Running' : 'Paused'
  }
</script>

<section class="panel-shell-flat flex flex-col p-2 block-full inline-full" aria-label="Sessions Panel">
  <button
    type="button"
    class="
      group text-text-primary
      {sidebarActionRowClass}
      hover:bg-white/6
    "
  >
    <span class={sidebarIconSlotClass}>
      <span
        class="
          flex items-center justify-center rounded-md bg-white/10 p-1 transition-colors
          group-hover:bg-white/14
        "
      >
        <svg viewBox="0 0 16 16" class="block-3.5 inline-3.5" aria-hidden="true">
          <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </span>
    </span>
    New Session
  </button>

  <nav class="flex shrink-0 flex-col" aria-label="Workspace navigation">
    {#each workspaceNavItems as item (item.id)}
      <button type="button" class={sidebarNavRowClass}>
        <span class={sidebarIconSlotClass}>
          {#if item.id === 'skills'}
            <svg viewBox="0 0 16 16" class="block-3.5 inline-3.5" aria-hidden="true">
              <path d="M8 2.5 9.2 6.3 13 7.5 9.2 8.7 8 12.5 6.8 8.7 3 7.5 6.8 6.3 8 2.5Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
            </svg>
          {:else if item.id === 'automations'}
            <svg viewBox="0 0 16 16" class="block-3.5 inline-3.5" aria-hidden="true">
              <path d="M9.2 2.2 5.2 8.4H8.4L6.8 13.8 10.8 7.6H7.6L9.2 2.2Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
            </svg>
          {:else}
            <svg viewBox="0 0 16 16" class="block-3.5 inline-3.5" aria-hidden="true">
              <path d="M6.2 2.5h3.6c.5 0 1 .2 1.4.6l2.7 2.7c.4.4.6.9.6 1.4v3.6c0 .5-.2 1-.6 1.4l-2.7 2.7c-.4.4-.9.6-1.4.6H6.2c-.5 0-1-.2-1.4-.6L2.1 11.2a2 2 0 0 1-.6-1.4V6.2c0-.5.2-1 .6-1.4L4.8 2.1c.4-.4.9-.6 1.4-.6Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
              <path d="M6.2 6.2h3.6v3.6H6.2V6.2Z" fill="none" stroke="currentColor" stroke-width="1.2" />
            </svg>
          {/if}
        </span>
        {item.label}
      </button>
    {/each}
  </nav>

  <hr class="mbs-2 mbe-2 shrink-0 border-0 border-bs border-white/8" />

  <div class="flex flex-1 flex-col gap-1 overflow-y-auto min-block-0">
    {#each SESSION_PROJECTS as project (project.id)}
      {@const expanded = isProjectExpanded(project.id)}
      <div class="flex flex-col">
        <button
          type="button"
          class="
            text-text-secondary
            hover:text-text-primary
            flex items-center gap-1.5 rounded-lg p-2 text-start text-sm font-medium transition-colors inline-full
            hover:bg-white/6
          "
          aria-expanded={expanded}
          onclick={() => toggleProject(project.id)}
        >
          <svg
            viewBox="0 0 16 16"
            class="
              shrink-0 transition-transform duration-200 block-3 inline-3
              {expanded ? 'rotate-90' : ''}"
            aria-hidden="true"
          >
            <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg viewBox="0 0 16 16" class="shrink-0 block-3.5 inline-3.5" aria-hidden="true">
            <path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h5l1.5 1.5H12A1.5 1.5 0 0 1 13.5 6v6.5A1.5 1.5 0 0 1 12 14H4A1.5 1.5 0 0 1 2.5 12.5v-8Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
          </svg>
          <span class="truncate">{project.name}</span>
        </button>

        {#if expanded}
          <ul class="flex flex-col gap-0.5 pbs-0.5" aria-label="{project.name} sessions" transition:slideFade={projectSessionsTransition}>
            {#each project.sessions as session (session.id)}
              <li>
                <button
                  type="button"
                  class="
                    text-text-primary flex items-center gap-2 rounded-lg py-1.5 ps-8 pe-2 text-start text-sm transition-colors inline-full
                    hover:bg-white/6
                  "
                >
                  <span class="flex shrink-0 items-center justify-center block-2 inline-2">
                    {#if session.status === 'running'}
                      <SessionRunningIndicator />
                    {:else}
                      <span class="rounded-full bg-amber-400/90 block-1.5 inline-1.5" aria-hidden="true"></span>
                    {/if}
                  </span>
                  <span class="flex-1 truncate min-inline-0">{session.name}</span>
                  <span class="text-text-secondary shrink-0 text-xs tabular-nums">{session.elapsed}</span>
                  <span class="sr-only">{sessionStatusLabel(session)}</span>
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>

  <div class="mbs-2 flex shrink-0 flex-col gap-2">
    <hr class="border-0 border-bs border-white/8" />
    <SessionsPanelAccountFooter />
  </div>
</section>
