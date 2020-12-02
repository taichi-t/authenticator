declare module 'express-session' {
  interface Session {
    info?: Record<string, unknown>;
  }
  interface SessionData {
    info?: Record<string, unknown>;
  }
}

export {};
