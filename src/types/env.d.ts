// This file defines the environment variable types for TypeScript
// Note: This is a frontend-only website - no backend/database required
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
