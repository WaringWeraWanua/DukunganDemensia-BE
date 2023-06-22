import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import {
  authHandler,
  locationHandler,
  eventHandler,
  userHandler,
  IHandler,
  newsHandler,
} from "./handlers";
import { generateDocs } from "./utils";
import { REST_METHOD } from "./constants";

import { MAP_MIDDLEWARES } from "./middlewares";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { eventRepo, locationRepo, newsRepo, userRepo } from "./repo";
// const swaggerDocument = require("./swagger.json");

const options = {
  explorer: true,
};

const registerRoutes = (app: Express, handlers: IHandler[]) => {
  handlers.forEach((handler) => {
    switch (handler.method) {
      case REST_METHOD.GET:
        app.get(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          handler.handler
        );
        break;
      case REST_METHOD.POST:
        app.post(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          handler.handler
        );
        break;
      case REST_METHOD.PUT:
        app.put(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          handler.handler
        );
        break;
      case REST_METHOD.DELETE:
        app.delete(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          handler.handler
        );
        break;
      case REST_METHOD.PATCH:
        app.patch(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          handler.handler
        );
        break;
      default:
        console.error("Method not supported");
    }
  });
};

const app: Express = express();
const port = 9999;

const meta = {
  startTime: new Date(),
} as const;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/health", (req: Request, res: Response) => {
  res.send(
    "This server has been started since " + meta.startTime.toLocaleString()
  );
});

app.get("/test", (req: Request, res: Response) => {
  const users = userRepo.findMany();
  const events = eventRepo.findMany();
  const locations = locationRepo.findMany();
  const news = newsRepo.findMany();

  res.send({
    users,
    events,
    locations,
    news,
  });
});

const handlers: IHandler[][] = [
  authHandler,
  newsHandler,
  locationHandler,
  eventHandler,
  userHandler,
];

handlers.forEach((handler) => {
  registerRoutes(app, handler);
});

const docs = generateDocs(handlers);

app.use("/", swaggerUi.serve, swaggerUi.setup(docs, options));

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
