import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import { authHandler, newsHandler, locationHandler, eventHandler, IHandler } from "./handlers";
import { wrapper } from "./utils";
import { REST_METHOD } from "./constants";

import { MAP_MIDDLEWARES, errorMiddleware } from "./middlewares";

const registerRoutes = (app: Express, handlers: IHandler[]) => {
  handlers.forEach((handler) => {
    switch (handler.method) {
      case REST_METHOD.GET:
        app.get(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          wrapper(handler.handler)
        );
        break;
      case REST_METHOD.POST:
        app.post(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          wrapper(handler.handler)
        );
        break;
      case REST_METHOD.PUT:
        app.put(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          wrapper(handler.handler)
        );
        break;
      case REST_METHOD.DELETE:
        app.delete(
          handler.path,
          ...MAP_MIDDLEWARES.DEFAULT_MIDDLEWARES,
          ...handler.middlewares,
          wrapper(handler.handler)
        );
        break;
      default:
        throw new Error("Method not supported");
    }
  });
};

const app: Express = express();
const port = 3000;

const meta = {
  startTime: Date.now(),
} as const;

app.use(bodyParser.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("This server has been started since " + meta.startTime);
});

registerRoutes(app, authHandler);
registerRoutes(app, newsHandler);
registerRoutes(app, locationHandler);
registerRoutes(app, eventHandler);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
