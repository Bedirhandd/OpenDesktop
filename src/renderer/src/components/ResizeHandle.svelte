<script lang="ts">
  type Orientation = 'horizontal' | 'vertical'
  type Edge = 'start' | 'end'

  let {
    orientation,
    edge,
    onResize
  }: {
    orientation: Orientation
    edge: Edge
    onResize: (delta: number) => void
  } = $props()

  let dragging = $state(false)

  function applyDelta(rawDelta: number): void {
    // End-edge panels are anchored to the far side (right/bottom), so their size
    // changes opposite to the raw pointer delta for the handle to follow the cursor.
    const signedDelta = edge === 'end' ? -rawDelta : rawDelta
    if (signedDelta !== 0) onResize(signedDelta)
  }

  function handlePointerDown(event: PointerEvent): void {
    event.preventDefault()

    const handle = event.currentTarget as HTMLElement
    dragging = true
    handle.setPointerCapture(event.pointerId)

    let lastX = event.clientX
    let lastY = event.clientY

    const cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize'
    document.body.style.cursor = cursor
    document.body.style.userSelect = 'none'

    function handlePointerMove(moveEvent: PointerEvent): void {
      if (orientation === 'vertical') {
        const delta = moveEvent.clientX - lastX
        lastX = moveEvent.clientX
        applyDelta(delta)
        return
      }

      const delta = moveEvent.clientY - lastY
      lastY = moveEvent.clientY
      applyDelta(delta)
    }

    function handlePointerUp(upEvent: PointerEvent): void {
      dragging = false
      handle.releasePointerCapture(upEvent.pointerId)
      handle.removeEventListener('pointermove', handlePointerMove)
      handle.removeEventListener('pointerup', handlePointerUp)
      handle.removeEventListener('pointercancel', handlePointerUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    handle.addEventListener('pointermove', handlePointerMove)
    handle.addEventListener('pointerup', handlePointerUp)
    handle.addEventListener('pointercancel', handlePointerUp)
  }
</script>

<div
  role="separator"
  aria-orientation={orientation}
  class={['group relative shrink-0 touch-none select-none', orientation === 'vertical' ? 'cursor-col-resize self-stretch inline-3' : 'cursor-row-resize block-3 inline-full', dragging ? 'bg-white/10' : 'bg-transparent']}
  onpointerdown={handlePointerDown}
>
  <div
    class={[
      `
        absolute bg-white/0 transition-colors
        group-hover:bg-white/15
      `,
      orientation === 'vertical' ? 'inset-y-1 inset-s-1/2 -translate-x-1/2 inline-px' : 'inset-x-1 inset-bs-1/2 -translate-y-1/2 block-px'
    ]}
  ></div>
</div>
