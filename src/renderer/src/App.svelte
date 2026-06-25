<script lang="ts">
  // Minimal app shell — workspace UI will be added in future PRs.
</script>

<main class="shell">
  <h1>OpenDesktop</h1>
  <p class="tagline">Desktop UI application shell for AI coding agents</p>
</main>

<style>
  .shell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .tagline {
    margin: 0;
    max-width: 28rem;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--ev-c-text-2);
  }
</style>
