import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import { authHandler, newsHandler, IHandler } from "./handlers";
import { wrapper } from "./utils";
import { REST_METHOD } from "./constants";

import { errorMiddleware } from "./middlewares";

const registerRoutes = (app: Express, handlers: IHandler[]) => {
  handlers.forEach((handler) => {
    switch (handler.method) {
      case REST_METHOD.GET:
        app.get(handler.path, wrapper(handler.handler));
        
    }
  })
}

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

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
