import winston from "winston";
import { config } from "./environment.config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  config.server.nodeEnv === "development"
    ? winston.format.colorize({ all: true })
    : winston.format.uncolorize(),

  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

const logger = winston.createLogger({
  level: config.server.nodeEnv === "development" ? "debug" : "warn",
  levels,
  format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
