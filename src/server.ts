import app from "@/app";
import { config } from "./config/environment.config";
import logger from "./config/logger.config";

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      logger.info(
        `🚀 Server running on port ${PORT} in ${config.server.nodeEnv} mode`
      );
    });

    process.on("unhandledRejection", (err: any) => {
      logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
      logger.error(err.name, err.message);

      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
