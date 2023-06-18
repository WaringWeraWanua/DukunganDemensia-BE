import { z } from "zod";
import { zoa } from "../utils";
import { BaseResponseSchema } from "./base";

export const EventDAO = zoa
  .object({
    id: zoa.string().openapi({
      description: "event's id",
      example: "1",
    }),
    createdAt: zoa.date().openapi({
      description: "event's created at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    updatedAt: zoa.date().openapi({
      description: "event's updated at",
      example: "2021-08-01T00:00:00.000Z",
    }),
    title: zoa.string().openapi({
      description: "event's title",
      example: "Event Title",
    }),
    description: zoa.string().openapi({
      description: "event's description",
      example: "Event Description",
    }),
    startTime: zoa.date().openapi({
      description: "event's start time",
      example: "2021-08-01T00:00:00.000Z",
    }),
    endTime: zoa.date().openapi({
      description: "event's end time",
      example: "2021-08-01T00:00:00.000Z",
    }),
    startNotifTime: zoa.date().openapi({
      description: "event's start notif time",
      example: "2021-08-01T00:00:00.000Z",
    }),
    proofImageUrl: zoa.string().openapi({
      description: "event's image url",
      example: "https://www.google.com",
    }).or(zoa.null()),
    doneTime: zoa.date().openapi({
      description: "event's done time",
      example: "2021-08-01T00:00:00.000Z",
    }).or(zoa.null()),
    careRelationId: zoa.string().openapi({
      description: "event's care relation id",
      example: "1",
    }),
  })
  .openapi("EventDAO");
export type EventDAOType = z.infer<typeof EventDAO>;

export const RespFetchEventSchemaData = zoa.object({
  patientId: zoa.string().openapi({
    description: "patient's id",
    example: "1",
  }),
  careGiverId: zoa.string().openapi({
    description: "care giver's id",
    example: "1",
  }),
  events: zoa.array(EventDAO).openapi("Events"),
});
export type RespFetchEventSchemaDataType = z.infer<
  typeof RespFetchEventSchemaData
>;

export const RespFetchEventSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespFetchEventSchemaData.optional(),
    })
    .openapi("RespFetchEventSchema")
);
export type RespFetchEventSchemaType = z.infer<typeof RespFetchEventSchema>;

export const ReqCreateEventSchema = zoa.object({
  title: zoa.string().openapi({
    description: "event's title",
    example: "Event Title",
  }),
  description: zoa.string().openapi({
    description: "event's description",
    example: "Event Description",
  }),
  startTime: zoa.coerce.date().openapi({
    description: "event's start time",
    example: "2021-08-01T00:00:00.000Z",
  }),
  endTime: zoa.coerce.date().openapi({
    description: "event's end time",
    example: "2021-08-01T00:00:00.000Z",
  }),
  startNotifTime: zoa.coerce.date().openapi({
    description: "event's start notif time",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type ReqCreateEventSchemaType = z.infer<typeof ReqCreateEventSchema>;

export const RespCreateEventSchemaData = EventDAO;
export type RespCreateEventSchemaDataType = z.infer<
  typeof RespCreateEventSchemaData
>;

export const RespCreateEventSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespCreateEventSchemaData.optional(),
    })
    .openapi("RespCreateEventSchema")
);
export type RespCreateEventSchemaType = z.infer<typeof RespCreateEventSchema>;

export const ReqSetImageUrlSchema = zoa.object({
  imageUrl: zoa.string().openapi({
    description: "event's image url",
    example: "https://www.google.com",
  }),
});
export type ReqSetImageUrlSchemaType = z.infer<typeof ReqSetImageUrlSchema>;

export const RespSetImageUrlData = EventDAO;
export type RespSetImageUrlDataType = z.infer<typeof RespSetImageUrlData>;

export const RespSetImageUrlSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespSetImageUrlData.optional(),
    })
    .openapi("RespSetImageUrlSchema")
);
export type RespSetImageUrlSchemaType = z.infer<typeof RespSetImageUrlSchema>;

export const ReqSetDoneTimeSchema = zoa.object({
  doneTime: zoa.coerce.date().openapi({
    description: "event's done time",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type ReqSetDoneTimeSchemaType = z.infer<typeof ReqSetDoneTimeSchema>;

export const RespSetDoneTimeData = EventDAO;
export type RespSetDoneTimeDataType = z.infer<typeof RespSetDoneTimeData>;

export const RespSetDoneTimeSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespSetDoneTimeData.optional(),
    })
    .openapi("RespSetDoneTimeSchema")
);
export type RespSetDoneTimeSchemaType = z.infer<typeof RespSetDoneTimeSchema>;

export const ReqUpdateEventSchema = zoa.object({
  title: zoa.string().openapi({
    description: "event's title",
    example: "Event Title",
  }),
  description: zoa.string().openapi({
    description: "event's description",
    example: "Event Description",
  }),
  startTime: zoa.coerce.date().openapi({
    description: "event's start time",
    example: "2021-08-01T00:00:00.000Z",
  }),
  endTime: zoa.coerce.date().openapi({
    description: "event's end time",
    example: "2021-08-01T00:00:00.000Z",
  }),
  startNotifTime: zoa.coerce.date().openapi({
    description: "event's start notif time",
    example: "2021-08-01T00:00:00.000Z",
  }),
});
export type ReqUpdateEventSchemaType = z.infer<typeof ReqUpdateEventSchema>;

export const RespUpdateEventData = EventDAO;
export type RespUpdateEventDataType = z.infer<typeof RespUpdateEventData>;

export const RespUpdateEventSchema = BaseResponseSchema.merge(
  zoa
    .object({
      data: RespUpdateEventData.optional(),
    })
    .openapi("RespUpdateEventSchema")
);
export type RespUpdateEventSchemaType = z.infer<typeof RespUpdateEventSchema>;
