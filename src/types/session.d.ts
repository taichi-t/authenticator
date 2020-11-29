export {};

declare module 'express-session' {
  interface Session {
    info?: Record<string, unknown>;
  }
}
