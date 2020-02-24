type ArticleStatus = "draft" | "published" | "unpublished";

export type Article = {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleLight = {
  id: string;
  title: string;
  slug: string;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleCreateDto = {
  title: string;
  body: string;
};

export type ArticleUpdateDto = {
  title?: string;
  body?: string;
  status?: ArticleStatus;
};
