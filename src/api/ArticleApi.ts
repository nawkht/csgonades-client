import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { Article, ArticleCreateDto, ArticleUpdateDto } from "../models/Article";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export class ArticleApi {
  static async getArticles(): AppResult<Article[]> {
    try {
      const result = await axios.get<Article[]>(`${Config.API_URL}/articles`);
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async articleById(id: string): AppResult<Article> {
    try {
      const result = await axios.get<Article>(
        `${Config.API_URL}/articles/${id}`
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async createArticle(articleDto: ArticleCreateDto, token: string) {
    try {
      const result = await axios.post<Article>(
        `${Config.API_URL}/articles`,
        articleDto,
        {
          headers: {
            headers: { Authorization: token },
          },
        }
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async updateArticle(
    data: ArticleUpdateDto,
    token: string
  ): AppResult<Article> {
    try {
      const result = await axios.patch<Article>(
        `${Config.API_URL}/articles`,
        data,
        {
          headers: {
            headers: { Authorization: token },
          },
        }
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
