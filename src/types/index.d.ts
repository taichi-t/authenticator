import 'express-session';

declare module 'express-session' {
  interface SessionData {
    info?: {
      message: string;
    };
  }
}
