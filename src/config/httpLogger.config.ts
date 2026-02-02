import morgan, { StreamOptions } from "morgan";
import logger from "./logger.config";

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default httpLogger;
