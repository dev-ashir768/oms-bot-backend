export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "4000", 10),
    apiPrefix: process.env.API_PREFIX || "/api/v1",
    url: process.env.SERVER_URL || "http://localhost:4000/api/v1",
  },
  ai:{
    googleApiKey: process.env.GOOGLE_API_KEY,
    geminiAiModel: process.env.GEMINI_AI_MODEL,
    embeddingModel: process.env.EMBEDDING_MODEL,
  }
};
