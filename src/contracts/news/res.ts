import { BaseResponse } from "../base";
import type { NewsModel } from "../../models";

export type CreateNewsData = NewsModel;
export type CreateNewsResponse = BaseResponse<NewsModel>;

export type FindManyNewsData = NewsModel[];
export type FindManyNewsResponse = BaseResponse<NewsModel[]>;
