import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import httpLogger from "./config/httpLogger.config";
import helmet from "helmet";
import chatRoutes from "./routes/chat.routes";
import { config } from "./config/environment.config";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use(config.server.apiPrefix, chatRoutes);


app.use(errorHandler);

export default app;
