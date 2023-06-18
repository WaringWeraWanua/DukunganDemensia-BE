import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { IHandler } from "../handlers";
import * as yaml from "yaml";
import * as fs from "fs";

export const registry = new OpenAPIRegistry();

export const generateDocs = (handlers: IHandler[][]) => {
  const flatten = handlers.flat();

  const genResponses = (obj: IHandler["responses"]) => {
    return Object.keys(obj).reduce(function (result: any, key: keyof typeof obj) {
      result[key] = obj[key];
      return result;
    }, {});
  }

  flatten.forEach((handler) => {
    registry.registerPath({
      method: handler.method,
      path: handler.path,
      request: handler.request,
      responses: genResponses(handler.responses),
    });
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const docs = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API",
    },
    servers: [{ url: "v1" }],
  });

  fs.writeFileSync(
    `${__dirname}/../../docs/openapi-docs.json`,
    JSON.stringify(docs)
  );

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  fs.writeFileSync(`${__dirname}/../../docs/openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });
};
