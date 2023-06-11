import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import { userHandler, newsHandler } from "./handlers";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.post("/news", newsHandler.create);
app.get("/news", newsHandler.findMany);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

