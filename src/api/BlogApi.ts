import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import {
  BlogPost,
  BlogPostCreateDto,
  BlogPostLight,
  BlogPostUpdateDto,
} from "../models/BlogPost";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export class BlogApi {
  static async getBlogPosts(): AppResult<BlogPostLight[]> {
    try {
      const result = await axios.get<BlogPostLight[]>(
        `${Config.API_URL}/articles`
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async blogPostById(id: string): AppResult<BlogPost> {
    try {
      const result = await axios.get<BlogPost>(
        `${Config.API_URL}/articles/${id}`
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async createBlogPost(articleDto: BlogPostCreateDto, token: string) {
    try {
      const result = await axios.post<BlogPost>(
        `${Config.API_URL}/articles`,
        articleDto,
        {
          headers: { Authorization: token },
        }
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async updateBlogPost(
    data: BlogPostUpdateDto,
    token: string
  ): AppResult<BlogPost> {
    try {
      const result = await axios.patch<BlogPost>(
        `${Config.API_URL}/articles`,
        data,
        {
          headers: { Authorization: token },
        }
      );
      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
