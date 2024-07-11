declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Adapter;
    }
  }
}

export {};
