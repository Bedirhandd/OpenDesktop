export type SessionStatus = 'running' | 'paused'

export interface Session {
  id: string
  name: string
  elapsed: string
  status: SessionStatus
}

export interface SessionProject {
  id: string
  name: string
  sessions: Session[]
}

export const SESSION_PROJECTS: SessionProject[] = [
  {
    id: 'opendesktop',
    name: 'OpenDesktop',
    sessions: [
      { id: 'refactor-layout', name: 'Refactor layout shell', elapsed: '5m', status: 'running' },
      { id: 'session-list-ui', name: 'Add session list UI', elapsed: '12m', status: 'running' },
      { id: 'ipc-schema', name: 'IPC schema review', elapsed: '1h', status: 'paused' }
    ]
  },
  {
    id: 'sidecar-api',
    name: 'sidecar-api',
    sessions: [
      { id: 'auth-migration', name: 'Migrate auth endpoints', elapsed: '2m', status: 'running' },
      { id: 'ws-reconnect', name: 'Fix websocket reconnect', elapsed: '18m', status: 'paused' }
    ]
  }
]
