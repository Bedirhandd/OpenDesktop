export const LAYOUT = {
  sessionsWidth: 291,
  explorerWidth: 294,
  terminalHeight: 208,
  minSessionsWidth: 180,
  minExplorerWidth: 180,
  minTerminalHeight: 120,
  minChatHeight: 160,
  minCenterWidth: 480,
  maxSessionsWidth: 400,
  maxExplorerWidth: 480,
  maxTerminalHeight: 520,
  handleSize: 12,
  mainHorizontalPadding: 24
} as const

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
