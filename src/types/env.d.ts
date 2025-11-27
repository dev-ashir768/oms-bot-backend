declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      API_PREFIX: string;
      SERVER_URL: string;
      GOOGLE_API_KEY: string;
      GEMINI_AI_MODEL: string;
      EMBEDDING_MODEL: string;
    }
  }
}

export {};
