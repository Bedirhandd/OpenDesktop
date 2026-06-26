<script lang="ts">
  import { ACCOUNT_PLACEHOLDER } from '@/lib/account'

  const iconButtonClass = 'text-text-secondary hover:text-text-primary flex shrink-0 items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/6'
</script>

<footer class="flex shrink-0 items-center gap-1" aria-label="Account">
  <button
    type="button"
    class="
      text-text-primary flex flex-1 items-center gap-2.5 rounded-lg p-2 text-start transition-colors min-inline-0
      hover:bg-white/6
    "
  >
    <span class="flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500/85 to-violet-500/85 text-xs font-semibold text-white block-8 inline-8" aria-hidden="true">
      {ACCOUNT_PLACEHOLDER.initials}
    </span>
    <span class="flex-1 min-inline-0">
      <span class="block truncate text-sm font-medium">{ACCOUNT_PLACEHOLDER.name}</span>
      <span class="text-text-secondary block truncate text-xs">{ACCOUNT_PLACEHOLDER.email}</span>
    </span>
  </button>

  <button type="button" class={iconButtonClass} aria-label="Settings">
    <svg viewBox="0 0 16 16" class="block-4 inline-4" aria-hidden="true">
      <circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.2" />
      <path d="M8 1.8v1.4M8 12.8v1.4M1.8 8h1.4M12.8 8h1.4M3.5 3.5l1 1M11.5 11.5l1 1M3.5 12.5l1-1M11.5 4.5l1-1" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
    </svg>
  </button>
</footer>
